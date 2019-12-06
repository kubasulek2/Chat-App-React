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
const PORT = process.env.PORT || 5000;




server.listen(PORT, () => console.log('Running on port ' + PORT));

//io.origins(['https://www.kubasulek2.pl/chat_react/']);


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
		const filter = new Filter() || {isProfane: (_) => false};

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
			client.emit('message', { ...msg, chatWithId: sendTo, chatWithName: receiver.userName, return: true });
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
		const options = { message: `https://google.com/maps?q=${ latitude },${ longitude }`, senderID: user.id, sender: user.userName, privy, location: true };
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

	/* switch room event */
	client.on('switchRoom', ({ roomName, createNew }, cb) => {

		/* Check existing rooms. */
		const existingRooms = fetchPublicRooms();

		/* createNew informs if client clicked on existing room or wants to create new one. */
		if (createNew) {

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
		
		/* Check rooms after update */
		const updatedRooms = fetchPublicRooms();
		
		/* Send appropriate events. */
		client.emit('joinRoom', { ...user, room: newRoom });
		io.to(newRoom).emit('usersList', getUsersByRoom(newRoom));
		io.to(oldRoom).emit('usersList', getUsersByRoom(oldRoom));

		/* Inform clients if rooms list changed */
		if (Object.keys(updatedRooms).length !== Object.keys(existingRooms).length) {
			io.emit('roomsList', fetchPublicRooms());
		}

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
		io.to(`${ requestedId }`).emit('openPrivateChat', { requestedID, requestedName, requestingID });

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

		/* if there is user to remove, remove it and send events to rooms. */
		if (user) {
			const roomsBefore = fetchPublicRooms();

			removeUserFromRoom(user.id, user.room);

			const roomsAfter = fetchPublicRooms();

			io.to(user.room).emit('usersList', getUsersByRoom(user.room));

			/* Optimization, don't send event when rooms not changed.  */
			if (Object.keys(roomsAfter).length < Object.keys(roomsBefore).length) {
				io.emit('roomsList', fetchPublicRooms());
			}

			handleLeaveMessage(client, user.userName, user.room);
		}
	});

});