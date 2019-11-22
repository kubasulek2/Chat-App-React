import React from 'react';
import moment from 'moment';
import { Emoji } from 'emoji-mart';


export const getLocation = () => {
	if (!navigator.geolocation) return { error: 'Geolocation not supported' };
	return new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(resolve, reject);
	});
};

export const formatTime = timestamp => moment(timestamp).format('h:mm a');

export const formatText = (text, emojiInfo) => {
	
	if (!emojiInfo) return text;
	
	const formattedText = text.split('');
	console.log(formattedText);
	
	emojiInfo.forEach(emoji => {
		formattedText[emoji.index] = <Emoji key={emoji.id + emoji.index} emoji={emoji.id} size={16} />;
		formattedText.splice(emoji.index + 1, 1);
	});

	console.log(formattedText);

	return formattedText;
};


