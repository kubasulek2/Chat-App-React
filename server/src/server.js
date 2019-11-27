const http = require('http');
const express = require('express');
const socketIo = require('socket.io');
const Filter = require('bad-words');
const { generateMessage } = require('./utils/messages');
const { addUser, getUser, removeUser, getUsersByRoom, updateUserRoomField } = require('./utils/users');
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

		const { roomError, roomName } = addUserToRoom(room, user.id);

		if (roomError) {
			return cb(roomError);
		}
		const options = {
			message: ', welcome!',
			user: user.userName,
			special: true
		};

		client.join(roomName);
		client.emit('login', user);
		client.emit('joinRoom', roomName);
		client.emit('roomsList', fetchPublicRooms());
		io.to(roomName).emit('usersList', getUsersByRoom(roomName));
		client.emit('welcome', generateMessage(options));

		options.message = 'has joined!';

		client.broadcast.to(room).emit('welcome', generateMessage(options));

Room
Room
Room
Room

	client.on('sendMessage', ({ message, emojiInfo, color }, cb) => {
		const filter = new Filter();

		if (filter.isProfane(message)) {
			return cb('Naughty, naughty!');
		}
		const user = getUser(client.id);
		if (!user) {
			return cb('User not found');
		}


		const options = {
			message,
			emojiInfo,
			color,
			user: user.userName
		};

		io.to(user.room).emit('message', generateMessage(options));
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

	client.on('createRoom', (roomName, cb) => {
		const user = getUser(client.id);

		if (!user) {
			return cb('User not found');
		}
		
		client.leave(user.room);
		client.join(roomName);
		removeUserFromRoom(user.id, user.room);

		const updatedUser = updateUserRoomField(client.id, roomName);
		
		const options = {
			message: ', welcome!',
			user: user.userName,
			special: true
		};
		
		
		addUserToRoom(updatedUser.id, updatedUser.room);

		client.emit('login', updatedUser);
		client.emit('joinRoom', roomName);
		io.emit('roomsList', fetchPublicRooms());
		io.to(roomName).emit('usersList', getUsersByRoom(roomName));
		client.emit('welcome', generateMessage(options));


		options.message = 'has joined!';

		client.broadcast.to(roomName).emit('welcome', generateMessage(options));

		cb();


	});

	client.on('disconnect', () => {

		const user = removeUser(client.id);
		
		if (user) {
			removeUserFromRoom(user.id, user.room);
			const options = {
				message: 'has left.',
				special: true,
				user: user.userName
			};
			io.to(user.room).emit('message', generateMessage(options));
			io.to(user.room).emit('usersList', getUsersByRoom(user.room));
			io.emit('roomsList', fetchPublicRooms());
		}

	});

});