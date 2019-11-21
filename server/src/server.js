const http = require('http');
const express = require('express');
const socketIo = require('socket.io');
const Filter = require('bad-words');
const { generateMessage } = require('./utils/messages');
const { addUser, getUser, removeUser, getUsersByRoom } = require('./utils/users');
const { addUserToRoom, fetchPublicRooms, removeUserFromRoom } = require('./utils/rooms');



const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const port = process.env.PORT || 5000;

server.listen(port, () => console.log('Running on port ' + port));

io.on('connection', (client) => {

	client.on('login', ({ userName, room }, cb) => {

		const { userError, user } = addUser({ id: client.id, userName, room });
		
		if (userError) {
			return cb(userError);
		}
		console.log(user);
		const { roomError, roomName } = addUserToRoom(room, user.id);
		
		if (roomError) {
			return cb(roomError);
		}

		client.join(roomName);
		client.emit('login');
		client.emit('joinRoom', roomName);
		client.emit('roomsList', fetchPublicRooms());
		client.emit('usersList', getUsersByRoom(roomName));
		client.emit('welcome', generateMessage(', welcome!', user.userName, true));
		client.broadcast.to(room).emit('welcome', generateMessage('has joined!', user.userName, true));

		cb();
	});



	client.on('sendMessage', (message, cb) => {
		const filter = new Filter();

		if (filter.isProfane(message)) {
			return cb('Naughty, naughty!');
		}
		const user = getUser(client.id);
		if (!user) {
			return cb('User not found');
		}
		io.to(user.room).emit('message', generateMessage(message, user.userName));
		cb();
	});

	client.on('sendLocation', ({ latitude, longitude }, cb) => {
		const user = getUser(client.id);

		if (!user) {
			return cb('User not found');
		}
		io.to(user.room).emit('locationMessage', generateMessage(`https://google.com/maps?q=${ latitude },${ longitude }`, user.userName));
		cb();
	});

	client.on('disconnect', () => {

		const user = removeUser(client.id);

		if (user) {
			console.log('client disconnected');
			io.to(user.room).emit('message', generateMessage('has left.', user.userName, true));
		}

	});

});