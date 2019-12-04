import React from 'react';
import moment from 'moment';
import { Emoji } from 'emoji-mart';

/** 
 * @function getLocation - Handle Geolocation Api. Handle Geolocation errors. 
 * @returns {Promise} 
 * */
export const getLocation = () => {
	
	if (!navigator.geolocation) {
		return { error: 'Geolocation not supported' };
	}

	return new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(resolve, reject);
	});
};

/* Format time using `moment` npm module. */
export const formatTime = timestamp => moment(timestamp).format('h:mm a');


/**
 * @var emojiRegex - Regex to catch all emojis.
 * @type {RegExp}
 */
const emojiRegex = /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/;


/**
 * @function formatText - Function replaces spaces with non breakable spaces, transforms native emoji into `EmojiMart` components.
 * @param {string} text - Unformatted text received from server.
 * @param {object} emojiInfo - Unformatted text received from server.
 * @requires Emoji - react component from `EmojiMart` npm module.
 * @returns {jsx || string} - Formatted text.
 */
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

/**
 * @function showToast - Dispatches reducer action to show a Toast component with a delay.
 * @param {function} cb - Callback reducer dispatch action.
 */
export const showToast = (cb, message) => {
	setTimeout(() => {
		cb({
			type: 'TOAST',
			message,
		});
	}, 400);
};


