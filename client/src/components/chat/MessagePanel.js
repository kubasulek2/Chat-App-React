import React, { useState, useEffect, useRef } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import LocationOnIcon from '@material-ui/icons/LocationOn';

import { socket } from '../../server/socket';
import { getLocation } from '../../utils/user';

const useStyles = makeStyles(({ spacing, palette }) => ({
	form: {
		width: '100%',
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
	sendButton: {
		fontWeight: 'bold',
		color: palette.text.primary,
		paddingLeft: 30,
		paddingRight: 30,
	},
	locationButton: {
		color: palette.text.primary,
	},
	textField: {
		flex: '1 1 auto',
		marginBottom: spacing(1)
	}
}));

const MessagePanel = () => {
	const classes = useStyles();
	const [ message, setMessage ] = useState('');
	const [ pending, setPending ] = useState(false);

	const textInput = useRef();

	useEffect(() => {
		console.log(textInput.current);
		textInput.current.focus();
	});

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

		try {
			const location = await getLocation();
			const { coords: { latitude, longitude } } = location;
			socket.emit('sendLocation', { latitude, longitude }, () => {
				setPending(false);
			});
		} catch (error) {
			// set error state to true
			console.log(error.message);
		}

	};

	return (
		<form autoComplete='off' className={classes.form}>
			<Grid container>
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

				<Grid container justify='flex-end' className={classes.bottomPanel}>
					<ButtonGroup
						size='large'
						className={classes.buttonGroup}
					>
						<Button
							color='secondary'
							variant='contained'
							className={classes.sendButton}
							onClick={handleSubmit}
							disabled={pending}
						> send
						</Button>
						<Button
							className={classes.locationButton}
							size='small'
							variant='contained'
							color='secondary'
							onClick={handleLocation}
							disabled={pending}
						>
							<LocationOnIcon />
						</Button>
					</ButtonGroup>
				</Grid>


			</Grid>
		</form>
	);
};

export default MessagePanel;