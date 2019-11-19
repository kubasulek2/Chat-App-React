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
	},
	buttonGroup: {
		borderRadius: 4
	},
	sendButton: {
		fontWeight: 'bold',
		color: palette.text.primary,
		paddingLeft: 24,
		paddingRight: 24,
	},
	locationButton: {
		color: palette.text.primary,
	},
	textField: {
		flex: '1 1 auto',
		marginRight: spacing(1)
	},
	rightPanel: {
		height: '100%'
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
				<TextField
					className={classes.textField}
					placeholder='Your Message'
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
				<div>
					<Grid container alignItems='flex-end' className={classes.rightPanel}>
						<ButtonGroup
							size='large'
							className={classes.buttonGroup}
						>
							<Button
								color='primary'
								variant='contained'
								className={classes.sendButton}
								onClick={handleSubmit}
								disabled={sending}
							> send
							</Button>
							<Button
								className={classes.locationButton}
								size='small'
								variant='contained'
								color='default'
							>
								<LocationOnIcon />
							</Button>
						</ButtonGroup>
					</Grid>
				</div>

			</Grid>
		</form>
	);
};

export default MessagePanel;