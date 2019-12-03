import React from 'react';
import moment from 'moment';
import { Emoji } from 'emoji-mart';


export const getLocation = () => {
	
	if (!navigator.geolocation) {
		return { error: 'Geolocation not supported' };
	}

	return new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(resolve, reject);
	});
};

export const formatTime = timestamp => moment(timestamp).format('h:mm a');



const emojiRegex = /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/;

export const formatText = (text, emojiInfo) => {
	
	text = text.replace(/ /g, '\xa0');

	if (!emojiInfo) {
		return text;
	}
	
	const formatedText = text.split(emojiRegex).filter(el => !emojiRegex.test(el) && el !== '');
	let counter = 1;

	emojiInfo.forEach((emoji, index) => {
		formatedText.splice(index + counter, 0, <Emoji key={emoji.id + index} emoji={emoji.id} size={22} />);
		counter++;
	});

	return formatedText;
};

export const showToast = (cb, message) => {
	setTimeout(() => {
		cb({
			type: 'TOAST',
			message,
		});
	}, 400);
};


