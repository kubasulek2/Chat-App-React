const http = require('http');
const express = require('express');
const socketIo = require('socket.io');


const app = express();
const server = http.createServer(app);
const io = socketIo(server);


const port = process.env.PORT || 5000;




server.listen(port, () => console.log('Running on port ' + port));
let count = 0;
io.on('connection', (client) => {
	console.log('Connected to Client');
	client.emit('countUpdated', count);
	client.on('increment',() => {
		count++;
		io.emit('countUpdated', count);
	});
});