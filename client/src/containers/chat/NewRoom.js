import React, { useState, useRef, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Zoom from '@material-ui/core/Zoom';

import { DispatchContext } from '../App';
import NewRoomButton from '../../components/UI/buttons/NewRoomButton';
import { socket } from '../../server/socket';


const useStyles = makeStyles(({ spacing, palette }) => ({
	form: {
		width: '100%',
		minHeight: 138.4,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},

	error: {
		color: palette.error.main,
		height: 20,
		margin: 8
	},
	cssOutlinedInput: {
		marginBottom: 0,
		caretColor: palette.secondary.main,
		'&$cssFocused $notchedOutline': {
			borderColor: 'rgba(66, 66, 66, .4) !important',
		}
	},
	input: {
		padding: '11.5px 5px',
	},
	cssFocused: {},

	notchedOutline: {
		borderWidth: '1px',
		borderColor: 'rgba(66, 66, 66, .4) !important'
	},
	textField: {
		width: '90%',
		flex: '1 1 auto',
		marginBottom: spacing(1.3),
		background: palette.background.light
	}
}));

/* Stateful Component displays add-new-room-panel, and handles new room form. */
const NewRoom = () => {
	const classes = useStyles();
	useEffect(() => console.log('NewRoom'));
	/* Use Context. */
	const { dispatchAppState } = useContext(DispatchContext);

	/* Local state, handles creating new room. */
	const [roomName, setRoomName] = useState('');
	const [localError, setLocalError] = useState(null);
	const [displayInput, setDisplayInput] = useState(false);

	/* Input reference */
	const inputRef = useRef();

	/* Input change */
	const handleInputChange = (evt) => {
		setRoomName(evt.target.value);
		setLocalError(false);
	};

	/* Form submit and validation */
	const handleSubmit = (evt) => {
		evt.preventDefault();
		
		if (roomName.length < 3) {
			return setLocalError('At least 3 characters.');
		}

		/* Emit socket event for switching to new room */
		socket.emit('switchRoom', { roomName, createNew: true }, (error) => {

			if (error) {
				/* Handle server error message */
				if (error.message){
					return dispatchAppState({ type: 'SET_ERROR', errType: error.type, message: error.message});
				}
				return setLocalError(error);
			}

			setLocalError(false);
			setDisplayInput(false);
			setRoomName('');
		});

	};

	/* Display input if hidden, submit form if input visible */
	const handleClick = (evt) => {

		if (!displayInput) {

			setDisplayInput(true);
			setTimeout(() => {
				inputRef.current.focus();
			}, 400);
		} else {
			handleSubmit(evt);
		}
	};

	/* Hide input, cancel typing new room. */
	const handleDismiss = () => {

		setLocalError(false);
		setDisplayInput(false);
		setRoomName('');
	};

	/* When input is visible and is empty, dismiss is available. */
	const dismiss = displayInput === true && roomName.length === 0;

	return (
		<form autoComplete='off' className={classes.form} onSubmit={handleSubmit}>
			<p className={classes.error}>{localError}</p>
			<Zoom in={displayInput} timeout={300}>
				<TextField
					onChange={handleInputChange}
					className={classes.textField}
					placeholder='Room name'
					variant='outlined'
					value={roomName}
					inputRef={inputRef}
					InputProps={{
						classes: {
							root: classes.cssOutlinedInput,
							input: classes.input,
							focused: classes.cssFocused,
							notchedOutline: classes.notchedOutline,
						}
					}}
				/>
			</Zoom>
			<NewRoomButton clicked={dismiss ? handleDismiss : handleClick} dismiss={dismiss} text={dismiss ? 'cancel' : 'add room'} />
		</form>
	);
};

export default NewRoom;

