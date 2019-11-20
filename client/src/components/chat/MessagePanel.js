import React, { useState, useEffect, useRef } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import { socket } from '../../server/socket';
import { getLocation } from '../../utils';
import PanelButtons from '../UI/buttons/PanelButtons';

const useStyles = makeStyles(({ spacing, palette }) => ({
	form: {
		width: '100%',
		display: 'flex'
	},
	cssOutlinedInput: {
		caretColor: palette.primary.dark,
		'&$cssFocused $notchedOutline': {
			borderColor: 'rgba(66, 66, 66, .4) !important',
		}
	},

	cssFocused: {},

	notchedOutline: {
		borderWidth: '1px',
		borderColor: 'rgba(66, 66, 66, .4) !important'
	},
	textField: {
		flex: '1 1 auto',
		marginBottom: spacing(1),
		background: palette.background.light
	}
}));

const MessagePanel = ({ pending, setPending }) => {
	const classes = useStyles();
	const [ message, setMessage ] = useState('');

	const textInput = useRef();

	useEffect(() => {
		textInput.current.focus();
	}, []);

	const handleSubmit = (evt) => {
		evt.preventDefault();
		setPending(true);
		setMessage('');

		socket.emit('sendMessage', message, error => {
			if (error) return console.log(error);
			setPending(false);
		});
	};

	const handleLocation = async () => {
		setPending(true);
		try {
			const location = await getLocation();
			const { coords: { latitude, longitude } } = location;
			socket.emit('sendLocation', { latitude, longitude }, () => {
				setTimeout(() => {
					setPending(false);

				}, 5000);
			});
		} catch (error) {
			// set error state to true
			console.log(error.message);
		}

	};

	return (
		<Grid container>
			<form autoComplete='off' className={classes.form} id='message-from'>
				<TextField
					disabled={pending}
					className={classes.textField}
					label='Your Message'
					variant='outlined'
					multiline
					rows={5}
					value={message}
					onChange={e => setMessage(e.target.value)}
					inputRef={textInput}
					InputProps={{
						classes: {
							root: classes.cssOutlinedInput,
							focused: classes.cssFocused,
							notchedOutline: classes.notchedOutline,
						}
					}}
				/>
			</form>

			<Grid container justify='flex-end' className={classes.bottomPanel}>
				<PanelButtons
					handleLocation={handleLocation}
					handleSubmit={handleSubmit}
					pending={pending}
				/>
			</Grid>


		</Grid>
	);
};

export default MessagePanel;