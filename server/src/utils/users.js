/**
 * @var users @type {array} - array of users
 */
const users = [];


/**
 * @function addUser - Validates user name and creates user object.
 * @param {string} userId - Client id.
 * @param {string} userName - Client name.
 * @param {string} room - Name of room send by the client.
 * @returns {object} - UserError or user.
 */
const addUser = (id, userName, room) => {
	const validate = /^(?=.*[a-zA-Z])[^\t\s]{5,12}$/;
	room = room.toLowerCase();

	if (!userName || !validate.test(userName)) {
		return { userError: 'Invalid Username.' };
	}	

	const existingUser = users.find(user => user.userName.toLowerCase() === userName.toLowerCase());

	if (existingUser) {
		return { userError: 'User already exists.' };
	}

	const user = { id, userName, room };
	users.push(user);

	return { user };

};

/**
 * @function updateUserRoomField - Updates user room property.
 * @param {string} id - User id.
 * @param {string} room - User room.
 * @returns {object} - user.
 */
const updateUserRoomField = (id, room) => {
	const index = users.findIndex(user => user.id === id);
	
	users[index].room = room;
	
	return users[index];
};

/**
 * @function removeUser - Removes user object from users array.
 * @param {string} id - User id.
 * @returns {object} - user.
 */
const removeUser = id => {
	const index = users.findIndex(user => user.id === id);

	if (index !== -1) {
		return users.splice(index, 1)[0];
	}	
};

/**
 * @function getUser - Finds user object in users array.
 * @param {string} id - User id.
 * @returns {object} - user.
 */
const getUser = id => users.find(user => user.id === id);

/**
 * @function getUsersByRoom - Displays users by given room.
 * @param {string} room - room to search.
 * @returns {array} - users in room array.
 */
const getUsersByRoom = (room) => users.filter(user => user.room === room);


module.exports = {
	addUser,
	getUser,
	updateUserRoomField,
	removeUser,
	getUsersByRoom
};
