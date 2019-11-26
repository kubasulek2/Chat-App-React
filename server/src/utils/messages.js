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

module.exports = {
	generateMessage
};