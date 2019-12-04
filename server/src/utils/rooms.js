/**
 * @var rooms @type {object} - object containing rooms arrays with users id
 */
const rooms = {
	public: []
};

/**
 * @function addUserToRoom - Creates room if not exists yet and add user id to room array
 * @param {string} userId - Client id.
 * @param {string} room - Name of room send by the client.
 * @returns {object || string} - RoomError or lowercase room name.
 */
const addUserToRoom = (userId, room) => {
	room = room.toLowerCase();

	if (!rooms[room]) {
		rooms[room] = [];
	}
		
	if (rooms[room].includes(userId)) {
		return { roomError: 'User already in room.' };
	}

	rooms[room].push(userId);

	return { room };
};

/**
 * @function removeUserFromRoom - Removes user id from room array, removes all empty rooms apart public room.
 * @param {string} userId - Client id.
 * @param {string} room - Name of room send by the client.
 * @returns {object || string} - RoomError or room name.
 */
const removeUserFromRoom = (userId, room) => {
	
	if (!rooms[room]) {
		return { roomError: 'Room not found' };
	}

	if (!rooms[room].includes(userId)) {
		return { roomError: 'User not found in room.' };
	}
	
	rooms[room].splice(rooms[room].indexOf(userId), 1);

	if (rooms[room].length === 0 && room !== 'public') {
		delete rooms[room];
	}
	
	return { room };
};

/**
 * @function fetchPublicRooms - Displays all rooms.
 * @returns {array} - rooms list.
 */
const fetchPublicRooms = () => Object.keys(rooms);

module.exports = {
	addUserToRoom,
	removeUserFromRoom,
	fetchPublicRooms
};
