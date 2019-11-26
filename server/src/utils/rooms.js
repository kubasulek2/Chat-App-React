const rooms = {
	public: []
};

const privatePattern = /^__private__/;

const addUserToRoom = (room, id) => {
	room = room.toLowerCase();

	if (!rooms[room]) rooms[room] = [];
	if (rooms[room].includes(id)) return { error: 'User already in room.' };
	if (privatePattern.test(room) && rooms[room].length === 2) return { error: 'No more than two persons in private rooms.' };

	rooms[room].push(id);

	return { roomName: room };
};

const removeUserFromRoom = (room, id) => {

	if (!rooms[room]) return { error: 'Room not found' };
	if (!rooms[room].includes(id)) return { error: 'User not found in room.' };

	rooms[room].splice(rooms[room].indexOf(id), 1);

	if (rooms[room].length === 0 && room !== 'public') delete rooms[room];

	return { roomName: room };
};

const fetchPublicRooms = () => Object.keys(rooms).filter(name => !privatePattern.test(name));

module.exports = {
	addUserToRoom,
	removeUserFromRoom,
	fetchPublicRooms
};
