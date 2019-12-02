const http = require('http');
const express = require('express');
const socketIo = require('socket.io');
const Filter = require('bad-words');
const { generateMessage, handleWelcomeMessages, handleLeaveMessage } = require('./utils/messages');
const { addUser, getUser, removeUser, getUsersByRoom, updateUserRoomField } = require('./utils/users');
const { addUserToRoom, fetchPublicRooms, removeUserFromRoom } = require('./utils/rooms');



const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const port = process.env.PORT || 5000;

server.listen(port, () => console.log('Running on port ' + port));

io.on('connection', (client) => {

	client.on('login', ({ userName, roomName }, cb) => {

		/**
		 * @param {string} roomName - Room name picked by user, can contain uppercase letters.
		 * @var {string} room - result of @function addUserToRoom - transformed @param roomName - no uppercase letters, used for establishing rooms.
		 */

		const { userError, user } = addUser(client.id, userName, roomName);

		if (userError) {
			return cb(userError);
		}

		const { roomError, room } = addUserToRoom(user.id, roomName);

		if (roomError) {
			return cb(roomError);
		}



		client.join(room);

		client.emit('joinRoom', user);
		client.emit('roomsList', fetchPublicRooms());
		io.to(room).emit('usersList', getUsersByRoom(room));

		handleWelcomeMessages(client, user.userName, room);
	});


	client.on('sendMessage', ({ message, emojiInfo, color, activeChat, privy }, cb) => {
		const user = getUser(client.id);
		const filter = new Filter();

		if (!user) {
			return cb({ message: 'Client not found', type: 401 });
		}

		if (filter.isProfane(message)) {
			return cb({ message: 'Naughty, naughty!', type: 403 });
		}

		const options = { message, emojiInfo, color, userID: user.id, user: user.userName, privy };
		const msg = generateMessage(options);

		io.to(`${ activeChat }`).emit('message', msg);

		if (privy) {
			client.emit('message', { ...msg, userID: activeChat });
		}


		cb();
	});


	client.on('sendLocation', ({ latitude, longitude, activeChat, privy }, cb) => {
		const user = getUser(client.id);

		if (!user) {
			return cb({ message: 'Client not found', type: 401 });
		}


		const options = { message: `https://google.com/maps?q=${ latitude },${ longitude }`, userID: user.id, user: user.userName, privy };
		const msg = generateMessage(options);

		io.to(`${ activeChat }`).emit('locationMessage', msg);

		if(privy){
			client.emit('locationMessage', { ...msg, userID: activeChat });
		}
		cb();
	});


	client.on('switchRoom', ({ roomName, createNew }, cb) => {

		if (createNew) {
			const existingRooms = fetchPublicRooms();

			if (existingRooms.includes(roomName.toLowerCase())) {
				return cb('Room already exists.');
			}
		}

		const user = getUser(client.id);

		if (!user) {
			return cb({ message: 'Client not found', type: 401 });
		}

		const { roomError, room: newRoom } = addUserToRoom(user.id, roomName);
		const { room: oldRoom } = user;

		if (roomError) {
			return cb(roomError);
		}


		client.leave(oldRoom);
		client.join(newRoom);

		removeUserFromRoom(user.id, oldRoom);
		updateUserRoomField(client.id, newRoom);


		client.emit('joinRoom', { ...user, room: newRoom });
		io.emit('roomsList', fetchPublicRooms());
		io.to(newRoom).emit('usersList', getUsersByRoom(newRoom));
		io.to(oldRoom).emit('usersList', getUsersByRoom(oldRoom));

		handleWelcomeMessages(client, user.userName, newRoom);
		handleLeaveMessage(client, user.userName, oldRoom);

		cb();
	});

	client.on('openPrivateChat', (requestedId) => {
		const user = getUser(client.id);
		const requestedUser = getUser(requestedId);

		if (!user) {
			return cb({ message: 'Client not found', type: 401 });
		}

		if (!requestedUser) {
			return cb({ message: 'Requested user not found', type: 404 });
		}
		client.emit('privateChat', { userName: requestedUser.userName, id: requestedUser.id });
		io.to(`${ requestedId }`).emit('privateChat', { userName: user.userName, id: user.id });

	});

	client.on('disconnect', () => {

		const user = removeUser(client.id);

		if (user) {
			removeUserFromRoom(user.id, user.room);

			io.to(user.room).emit('usersList', getUsersByRoom(user.room));
			io.emit('roomsList', fetchPublicRooms());

			handleLeaveMessage(client, user.userName, user.room);
		}
	});

});