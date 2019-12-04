const http = require('http');
const express = require('express');
const socketIo = require('socket.io');
const Filter = require('bad-words');
const { generateMessage, handleWelcomeMessages, handleLeaveMessage } = require('./utils/messages');
const { addUser, getUser, removeUser, getUsersByRoom, updateUserRoomField } = require('./utils/users');
const { addUserToRoom, fetchPublicRooms, removeUserFromRoom } = require('./utils/rooms');


/* Create server and socket. */
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const port = process.env.PORT || 5000;

server.listen(port, () => console.log('Running on port ' + port));

/* on socket connection. */
io.on('connection', (client) => {


	/* Handle user login. */
	client.on('login', ({ userName, roomName }, cb) => {

		/**
		 * @param {string} roomName - Room name picked by user, can contain uppercase letters.
		 * @var {string} room - result of @function addUserToRoom - transformed @param roomName - no uppercase letters, used for establishing rooms.
		 */

		/* add user to usersList - returns user or error */
		const { userError, user } = addUser(client.id, userName, roomName);

		/* Send error back to client */
		if (userError) {
			return cb(userError);
		}

		/* add user id to room array on roomsList - returns room or error */
		const { roomError, room } = addUserToRoom(user.id, roomName);

		/* Send error back to client */
		if (roomError) {
			return cb(roomError);
		}


		/* Joining room */
		client.join(room);

		/* send appropriate events to clients/rooms */
		client.emit('joinRoom', user);
		client.emit('roomsList', fetchPublicRooms());
		io.to(room).emit('usersList', getUsersByRoom(room));

		/* Format and send welcome message. */
		handleWelcomeMessages(client, user.userName, room);
	});

	/* Handle clients messages */
	client.on('sendMessage', ({ message, emojiInfo, color, sendTo, privy }, cb) => {
		const user = getUser(client.id);
		/* npm package for checking profanity in strings */
		const filter = new Filter();

		/* handle user not found */
		if (!user) {
			return cb({ message: 'Client not found', type: 401 });
		}
		/* if message is public check it towards profanity. */
		if (!privy && filter.isProfane(message)) {
			return cb({ message: 'Naughty, naughty!', type: 403 });
		}

		/* Format message to send it to clients. */
		const options = { message, emojiInfo, color, senderID: user.id, sender: user.userName, privy };
		const msg = generateMessage(options);

		/* Send it to requested user or room. */
		io.to(`${ sendTo }`).emit('message', msg);

		if (privy) {
			/* if message is private check if requested user exists */
			const receiver = getUser(sendTo);

			/* Inform client if requested user doesn't exists.*/
			if (!receiver) {
				return cb({ message: 'Requested user not found', type: 404 });
			}
			/* If no errors send message back to sender */
			client.emit('message', { ...msg, senderID: sendTo, sender: receiver.userName });
		}


		cb();
	});

	/* Handle location message */
	client.on('sendLocation', ({ latitude, longitude, sendTo, privy }, cb) => {
		const user = getUser(client.id);

		/* handle user not found */
		if (!user) {
			return cb({ message: 'Client not found', type: 401 });
		}

		/* Format message to send it to clients. */
		const options = { message: `https://google.com/maps?q=${ latitude },${ longitude }`, senderID: user.id, sender: user.userName, privy };
		const msg = generateMessage(options);

		/* Send it to requested user or room. */
		io.to(`${ sendTo }`).emit('locationMessage', msg);

		if (privy) {
			/* if message is private check if requested user exists */
			const receiver = getUser(sendTo);

			/* Inform client if requested user doesn't exists.*/
			if (!receiver) {
				return cb({ message: 'Requested user not found', type: 404 });
			}

			/* If no errors send message back to sender */
			client.emit('locationMessage', { ...msg, senderID: sendTo, sender: receiver.userName });
		}
		cb();
	});

	/* switch room event */
	client.on('switchRoom', ({ roomName, createNew }, cb) => {
		/* createNew informs if client clicked on existing room or wants to create new one. */
		if (createNew) {
			/* Check if requested new room doesn't already exists. */
			const existingRooms = fetchPublicRooms();

			/* Inform client, room already exists. */
			if (existingRooms.includes(roomName.toLowerCase())) {
				return cb('Room already exists');
			}
		}

		/* Get user */
		const user = getUser(client.id);

		/* Handle user not found */
		if (!user) {
			return cb({ message: 'Client not found', type: 401 });
		}

		/* Define old and new room. */
		const { roomError, room: newRoom } = addUserToRoom(user.id, roomName);
		const { room: oldRoom } = user;

		/* Handle room error */
		if (roomError) {
			return cb({ message: roomError, type: 500 });
		}

		/* Leave old and join new room. */
		client.leave(oldRoom);
		client.join(newRoom);

		removeUserFromRoom(user.id, oldRoom);
		updateUserRoomField(client.id, newRoom);

		/* Send appropriate events. */
		client.emit('joinRoom', { ...user, room: newRoom });
		io.emit('roomsList', fetchPublicRooms());
		io.to(newRoom).emit('usersList', getUsersByRoom(newRoom));
		io.to(oldRoom).emit('usersList', getUsersByRoom(oldRoom));

		/* Handle server messages. */
		handleWelcomeMessages(client, user.userName, newRoom);
		handleLeaveMessage(client, user.userName, oldRoom);

		cb();
	});

	/* Client send this event when attempt to private chat with other client */
	client.on('privateChatRequest', (requestedId, cb) => {
		/* Check if both clients exists. */
		const { id: requestingID, userName: requestingName } = getUser(client.id);
		const { id: requestedID, userName: requestedName } = getUser(requestedId);

		/* Handle clients non existing. */
		if (!requestingName) {
			return cb({ message: 'Client not found', type: 401 });
		}

		if (!requestedName) {
			return cb({ message: 'Requested user not found', type: 404 });
		}

		/* send event to requested client, for him either accepts or rejects private chat. */
		io.to(`${ requestedId }`).emit('openPrivateChat', { requestedID, requestedName, requestingID, requestingName });

		cb();

	});
	/* Handle private chat rejection. */
	client.on('rejectChat', ({ requestedName, requestingID }) => {
		io.to(`${ requestingID }`).emit('chatRejected', { requestedName });
	});

	/* Handle private chat acceptance. */
	client.on('acceptChat', ({ requestedID, requestedName, requestingID }) => {
		io.to(`${ requestingID }`).emit('chatAccepted', { requestedName, requestedID });
	});

	/* Handle client disconnect. */
	client.on('disconnect', () => {
		/* Remove user from users list. */
		const user = removeUser(client.id);

		if (user) {
			/* if there is user to remove, remove it and send events to rooms. */
			removeUserFromRoom(user.id, user.room);

			io.to(user.room).emit('usersList', getUsersByRoom(user.room));
			io.emit('roomsList', fetchPublicRooms());

			handleLeaveMessage(client, user.userName, user.room);
		}
	});

});