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


	client.on('sendMessage', ({ message, emojiInfo, color, sendTo, privy }, cb) => {
		const user = getUser(client.id);
		const filter = new Filter();


		if (!user) {
			return cb({ message: 'Client not found', type: 401 });
		}

		if (!privy && filter.isProfane(message)) {
			return cb({ message: 'Naughty, naughty!', type: 403 });
		}

		const options = { message, emojiInfo, color, senderID: user.id, sender: user.userName, privy };
		const msg = generateMessage(options);

		io.to(`${ sendTo }`).emit('message', msg);

		if (privy) {
			const receiver = getUser(sendTo);

			if (!receiver) {
				return cb({ message: 'Requested user not found', type: 404 });
			}

			client.emit('message', { ...msg, senderID: sendTo, sender: receiver.userName });
		}


		cb();
	});


	client.on('sendLocation', ({ latitude, longitude, sendTo, privy }, cb) => {
		const user = getUser(client.id);

		if (!user) {
			return cb({ message: 'Client not found', type: 401 });
		}


		const options = { message: `https://google.com/maps?q=${ latitude },${ longitude }`, senderID: user.id, sender: user.userName, privy };
		const msg = generateMessage(options);

		io.to(`${ sendTo }`).emit('locationMessage', msg);

		if (privy) {
			const receiver = getUser(sendTo);

			if (!receiver) {
				return cb({ message: 'Requested user not found', type: 404 });
			}

			client.emit('locationMessage', { ...msg, senderID: sendTo, sender: receiver.userName });
		}
		cb();
	});


	client.on('switchRoom', ({ roomName, createNew }, cb) => {

		if (createNew) {
			const existingRooms = fetchPublicRooms();

			if (existingRooms.includes(roomName.toLowerCase())) {
				return cb('Room already exists');
			}
		}

		const user = getUser(client.id);

		if (!user) {
			return cb({ message: 'Client not found', type: 401 });
		}

		const { roomError, room: newRoom } = addUserToRoom(user.id, roomName);
		const { room: oldRoom } = user;

		if (roomError) {
			return cb({message: roomError, type: 500});
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

	client.on('privateChatRequest', (requestedId, cb) => {
		const { id: requestingID, userName: requestingName } = getUser(client.id);
		const { id: requestedID, userName: requestedName } = getUser(requestedId);

		if (!requestingName) {
			return cb({ message: 'Client not found', type: 401 });
		}

		if (!requestedName) {
			return cb({ message: 'Requested user not found', type: 404 });
		}

		io.to(`${ requestedId }`).emit('openPrivateChat', { requestedID, requestedName, requestingID, requestingName });

		cb();

	});

	client.on('rejectChat', ({ requestedName, requestingID }) => {
		io.to(`${ requestingID }`).emit('chatRejected', { requestedName });
	});

	client.on('acceptChat', ({ requestedID, requestedName, requestingID }) => {
		io.to(`${ requestingID }`).emit('chatAccepted', { requestedName, requestedID });
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