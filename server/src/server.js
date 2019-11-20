const http = require('http');
const express = require('express');
const socketIo = require('socket.io');
const Filter = require('bad-words');
const { generateMessage } = require('./utils/messages');


const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const port = process.env.PORT || 5000;

server.listen(port, () => console.log('Running on port ' + port));

io.on('connection', (client) => {

	client.emit('welcome', generateMessage('Welcome!'));
	client.broadcast.emit('welcome', generateMessage('New user has joined!'));

	client.on('sendMessage', (message, cb) => {
		const filter = new Filter();

		if (filter.isProfane(message)) {
			return cb('Profanity is not allowed');
		}

		io.emit('message',generateMessage(message));
		cb();
	});

	client.on('sendLocation', ({ latitude, longitude }, cb) => {
		io.emit('locationMessage', generateMessage(`https://google.com/maps?q=${ latitude },${ longitude }`));
		cb('Location shared');
	});

	client.on('disconnect', () => {
		console.log('client disconnected');
		io.emit('message', generateMessage('A user has left'));
	});
});