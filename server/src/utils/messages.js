/* Generate message ready to send to clients */
const generateMessage = ({ sender, senderID, special = false, color = '#b0bec5', emojiInfo = [], message, privy }) => {

	return {
		text: message,
		sender,
		senderID,
		color,
		emojiInfo,
		special,
		privy,
		timestamp: new Date().getTime()
	};
};

/* Generate and send special type of message created by server. */
handleWelcomeMessages = (socket, userName, room) => {

	const options = {
		message: ', welcome!',
		sender: userName,
		special: true
	};

	socket.emit('welcome', generateMessage(options));

	options.message = 'has joined!';

	socket.broadcast.to(room).emit('welcome', generateMessage(options));

};

/* Generate and send special type of message created by server. */
handleLeaveMessage = (socket, userName, room) => {
	const options = {
		message: 'has left.',
		special: true,
		sender: userName
	};
	socket.broadcast.to(room).emit('message', generateMessage(options));
};

module.exports = {
	generateMessage,
	handleWelcomeMessages,
	handleLeaveMessage
};