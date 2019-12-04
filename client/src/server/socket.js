import socketCLI from 'socket.io-client';

/* Create socket Client and point address to listen to. */
export const socket = socketCLI('http://localhost:5000');
