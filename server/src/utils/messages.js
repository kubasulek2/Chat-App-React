const  generateMessage = text => ({
	text,
	timestamp: new Date().getTime()
});

module.exports = {
	generateMessage
};