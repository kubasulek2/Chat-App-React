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
		const { roomError, room } = addUserToRoom(user.id, roomName);

		if (userError) return cb(userError);
		if (roomError) return cb(roomError);



		client.join(room);

		client.emit('joinRoom', user);
		client.emit('roomsList', fetchPublicRooms());
		io.to(room).emit('usersList', getUsersByRoom(room));

		handleWelcomeMessages(client, user.userName, room);
	});


	client.on('sendMessage', ({ message, emojiInfo, color }, cb) => {
		const user = getUser(client.id);
		const filter = new Filter();

		if (!user) return cb('User not found');
		if (filter.isProfane(message)) return cb('Naughty, naughty!');

		const options = { message, emojiInfo, color, user: user.userName };

		io.to(user.room).emit('message', generateMessage(options));

		cb();
	});


	client.on('sendLocation', ({ latitude, longitude }, cb) => {
		const user = getUser(client.id);

		if (!user) return cb('User not found');

		io.to(user.room).emit('locationMessage', generateMessage(`https://google.com/maps?q=${ latitude },${ longitude }`, user.userName));

		cb();
	});


	client.on('switchRoom', (roomName, cb) => {
		const user = getUser(client.id);
		
		if (!user) return cb('User not found');
		
		const { roomError, room: newRoom } = addUserToRoom(user.id, roomName);
		const { room: oldRoom } = user;
		
		if (roomError) return cb(roomError);

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