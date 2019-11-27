const rooms = {
	public: []
};

const privatePattern = /^__private__/;

const addUserToRoom = (userId, room) => {
	room = room.toLowerCase();

	if (!rooms[room]) rooms[room] = [];
	if (rooms[room].includes(userId)) return { roomError: 'User already in room.' };
	if (privatePattern.test(room) && rooms[room].length === 2) return { roomError: 'No more than two persons in private rooms.' };

	rooms[room].push(userId);

	return { room: room };
};

const removeUserFromRoom = (userId, room) => {

	if (!rooms[room]) return { roomError: 'Room not found' };
	if (!rooms[room].includes(userId)) return { roomError: 'User not found in room.' };

	rooms[room].splice(rooms[room].indexOf(userId), 1);

	if (rooms[room].length === 0 && room !== 'public') delete rooms[room];

	return { room: room };
};

const fetchPublicRooms = () => Object.keys(rooms).filter(name => !privatePattern.test(name));

module.exports = {
	addUserToRoom,
	removeUserFromRoom,
	fetchPublicRooms
};
