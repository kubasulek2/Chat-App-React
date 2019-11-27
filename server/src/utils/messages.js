const generateMessage = ({ user, special, color, emojiInfo, message }) => {
	special = special || false;
	color = color || '#b0bec5';
	emojiInfo = emojiInfo || [];
	
	return {
		text: message,
		user,
		color,
		emojiInfo,
		special,
		timestamp: new Date().getTime()
	};
};

handleWelcomeMessages = (socket, userName, room) => {
	
	const options = {
		message: ', welcome!',
		user: userName,
		special: true
	};
	
	socket.emit('welcome', generateMessage(options));

	options.message = 'has joined!';

	socket.broadcast.to(room).emit('welcome', generateMessage(options));

};

handleLeaveMessage = (socket, userName, room) => {
	const options = {
		message: 'has left.',
		special: true,
		user: userName
	};
	socket.broadcast.to(room).emit('message', generateMessage(options));
};

module.exports = {
	generateMessage,
	handleWelcomeMessages,
	handleLeaveMessage
};