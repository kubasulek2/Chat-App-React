const  generateMessage = (text, user, type = false) => ({
	text,
	user,
	special: type,
	timestamp: new Date().getTime()
});

module.exports = {
	generateMessage
};