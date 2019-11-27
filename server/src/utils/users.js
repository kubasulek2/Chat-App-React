const users = [];

const addUser = (id, userName, room) => {
	const validate = /^(?=.*[a-z])[^\t\s]{5,}$/;
	room = room.toLowerCase();

	if (!userName || !validate.test(userName)) return { userError: 'Invalid Username.' };

	const existingUser = users.find(user => user.userName.toLowerCase() === userName.toLowerCase());

	if (existingUser) return { userError: 'User already exists.' };

	const user = { id, userName, room };
	users.push(user);

	return { user };

};
const updateUserRoomField = (id, room) => {
	const index = users.findIndex(user => user.id === id);
	users[index].room = room;
	return users[index];
};


const removeUser = id => {

	const index = users.findIndex(user => user.id === id);

	if (index !== -1) return users.splice(index, 1)[0];
};

const getUser = id => users.find(user => user.id === id);

const getUsersByRoom = (room) => users.filter(user => user.room === room);


module.exports = {
	addUser,
	getUser,
	updateUserRoomField,
	removeUser,
	getUsersByRoom
};
