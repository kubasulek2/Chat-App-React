import React, { useState, useEffect, useRef } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import { socket } from '../../server/socket';
import { getLocation } from '../../utils/user';

const useStyles = makeStyles(({ pallete }) => ({
	root: {
		
	}
}));

const MessagePanel = () => {
	const classes = useStyles();
	const [ message, setMessage ] = useState('');
	const [ sending, setSending ] = useState(false);

	const textInput = useRef();

	useEffect(() => {
		socket.on('welcome', message => console.log(message));
		socket.on('message', message => console.log(message));
		socket.on('locationMessage', message => console.log(message));
		getLocation();

	}, []);

	useEffect(() => {
		textInput.current.focus();
	});

	const handleSubmit = (evt) => {
		evt.preventDefault();
		setSending(true);
		setMessage('');

		socket.emit('sendMessage', message, error => {
			if (error) return console.log(error);
			setSending(false);
		});
	};
	return (
		<Grid container className={classes.root}>
			<form autoComplete='off'>
				<input
					type="text"
					name="message"
					value={message}
					onChange={e => setMessage(e.target.value)}
					ref={textInput}
				/>
				<button
					onClick={handleSubmit}
					disabled={sending}
				>send</button>
			</form>
		</Grid>
	);
};

export default MessagePanel;