const rooms = {
	public: []
};


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

const fetchPublicRooms = () => Object.keys(rooms);

module.exports = {
	addUserToRoom,
	removeUserFromRoom,
	fetchPublicRooms
};
