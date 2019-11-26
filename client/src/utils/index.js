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



/**
 * @type {regex}
 * @var emojiRegex - used for splitting the string with "1944__{{__emoji__}}__1944" delimiter.
 */

const emojiRegex = /1944__\{\{__emoji__\}\}__1944/;

export const formatText = (text, emojiInfo) => {

	if (!emojiInfo) return text;

	emojiInfo.forEach(emoji => {
		text = text.replace(emoji.native, '1944__{{__emoji__}}__1944');
	});

	const formatedText = text.split(emojiRegex);
	let counter = 1;
	console.log(formatedText);

	emojiInfo.forEach((emoji, index) => {
		formatedText.splice(index + counter, 0, <Emoji key={emoji.id + index} emoji={emoji.id} size={22} />);
		counter++;
	});


	// 

	return formatedText;
};


