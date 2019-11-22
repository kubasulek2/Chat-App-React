import moment from 'moment';
export const getLocation = () => {
	if (!navigator.geolocation) return { error: 'Geolocation not supported' };
	return new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(resolve, reject);
	});
};

export const formatTime = timestamp => moment(timestamp).format('h:mm a');

export const formatText = (text, emojiInfo) => {
	if (!emojiInfo) return [text];

	const formattedText = [];
	let currentIndex = 0;
	emojiInfo.forEach(emoji => {
		text = text.slice(currentIndex, emojiInfo[emoji].index);
	});
	return formattedText;
};


