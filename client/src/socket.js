import socketCLI from 'socket.io-client';
export const socket = socketCLI('http://localhost:5000');

/* const subscribeToTimer = (cb) => {
	socket.on('timer', timestamp => cb(null, timestamp));
	socket.emit('subscribeToTimer', 1000);
}; */