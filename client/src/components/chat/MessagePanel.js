import React, { useState, useEffect, useRef } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { socket } from '../../server/socket';
import { getLocation } from '../../utils/user';

const useStyles = makeStyles(({ palette }) => ({
	form: {
		width: '100%',
		'& .MuiOutlinedInput-root': {
			borderRadius: 4
		}
	},
	cssOutlinedInput: {
		'&$cssFocused $notchedOutline': {
			borderColor: 'rgba(66, 66, 66, .4) !important',
		}
	},

	cssFocused: {},

	notchedOutline: {
		borderWidth: '1px',
		borderColor: 'rgba(66, 66, 66, .4) !important'
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
		console.log(textInput.current);
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
		<form autoComplete='off' className={classes.form}>
			<Grid container>
				<Grid item xs={11}>
					<TextField
						placeholder='Your Message'
						variant='outlined'
						multiline
						rows={5}
						fullWidth
						value={message}
						onChange={e => setMessage(e.target.value)}
						inputRef={textInput}
						InputProps={{
							classes: {
								root: classes.cssOutlinedInput,
								focused: classes.cssFocused,
								notchedOutline: classes.notchedOutline,
							},
							inputMode: 'numeric'
						}}
					/>
				</Grid>
				<Grid item xs={1}>
					<Button
						variant='contained'
						color='secondary'
						size='large'
						onClick={handleSubmit}
						disabled={sending}
					>send
					</Button>
				</Grid>
			</Grid>
		</form>
	);
};

export default MessagePanel;