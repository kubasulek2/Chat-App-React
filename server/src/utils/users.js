const users = [];
const bannedUsers = [];

const addUser = ({ id, userName, room, ip }) => {
	const validate = /^[^\t\s]{5,}$/;
	userName = userName.toLowerCase();
	room = room.toLowerCase();

	if (!userName || !validate.test(userName)) return { error: 'Invalid Username.' };

	const existingUser = users.find(user => user.userName === userName);

	if (existingUser) return { error: 'User already exists.' };

	// check if is banned here

	const user = { id, userName, room };
	users.push({ ...user, ip });
	
	return { user };

};


const generateBannedMessage = count => {
	switch (count) {
		case 1:
			return 'You are banned. You can log in again after 1 hour.';
		case 2:
			return 'You are banned. You can log in again after 2 hours.';
		case 3:
			return 'You are banned, Contact administration.';
		default:
			break;
	}
};
const banUser = ip => {

	// implement it with json file
	const alreadyBanned = bannedUsers.splice(bannedUsers.findIndex(user => user.ip === ip), 1);

	if (alreadyBanned) {
		alreadyBanned.count += 1;
		alreadyBanned.timestamp = new Date().getTime();
		bannedUsers.push(alreadyBanned);
		return generateBannedMessage(alreadyBanned.count);
	}
	const bannedUser = {
		ip,
		count: 1,
		timestamp: new Date().getTime()
	};

	bannedUsers.push(bannedUser);
	return generateBannedMessage(bannedUser.count);

};

const removeUser = id => {

	const index = users.findIndex(user => user.id === id);

	if (index !== -1) return users.splice(index, 1)[ 0 ];
};

const getUser = id => users.find(user => user.id === id);

const getUsersByRoom = room => users.filter(user => user.room === room);


module.exports = {
	addUser,
	getUser,
	removeUser,
	banUser,
	getUsersByRoom
};
