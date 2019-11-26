import React, { useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Zoom from '@material-ui/core/Zoom';

import NewRoomButton from '../UI/buttons/NewRoomButton';


const useStyles = makeStyles(({ spacing, palette }) => ({
	form: {
		width: '100%',
		minHeight: 154.4,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},

	error: {
		color: palette.error.main,
		height: 20,
	},
	cssOutlinedInput: {
		marginBottom: 0,
		caretColor: palette.secondary.main,
		'&$cssFocused $notchedOutline': {
			borderColor: 'rgba(66, 66, 66, .4) !important',
		}
	},
	input:{
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


const NewRoom = () => {
	const classes = useStyles();
	const [roomName, setRoomName] = useState('');
	const [error, setError] = useState(null);
	const [displayInput, setDisplayInput] = useState(false);
	const textInput = useRef();

	const handleInputChange =  (evt) => {
		evt = evt || window.event;
		setRoomName(evt.target.value);
	};

	const handleSubmit = (evt) => {
		evt.preventDefault();
		
		const privatePattern = /^__private__/;
		
		if (privatePattern.test(roomName)) return setError('This name is reserved.');
		else if (roomName.length < 3) return setError('At least 3 characters.');
		setError(false);
		setDisplayInput(false);
		setRoomName('');
	};

	const handleClick = (evt) => {
		evt = evt || window.event;

		if(!displayInput){
			
			setDisplayInput(true);
			setTimeout(() => {
				textInput.current.focus();
			}, 400);
		} else {
			handleSubmit(evt);
		}
	};

	return (
		<form autoComplete='off' className={classes.form} onSubmit={handleSubmit}>
			<p className={classes.error}>{error}</p>
			<Zoom in={displayInput} timeout={300}>
				<TextField
					onChange={handleInputChange}
					className={classes.textField}
					placeholder='Room name'
					variant='outlined'
					value={roomName}
					inputRef={textInput}
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
			<NewRoomButton clicked={handleClick}/>	
		</form>
	);
}

export default NewRoom;

