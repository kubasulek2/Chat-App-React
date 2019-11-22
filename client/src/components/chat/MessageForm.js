import React, { useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

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

const MessageForm = ({ message, setMessage, pending, handleSubmit, uppercaseMode }) => {
	const classes = useStyles();
	const textInput = useRef();
	const form = useRef();

	useEffect(() => {
		console.log(textInput.current);
		setTimeout(() => textInput.current.focus(), 200);
	});

	const handleKeyDown = (evt) => {
		evt = evt || window.event;

		if (evt.key === 'Enter' && evt.shiftKey && document.activeElement.id === textInput.current.id) {
			return;
		}
		else if (evt.key === 'Enter' && document.activeElement.id === textInput.current.id) {
			handleSubmit(evt);
		}
	};

	const handleInputChange = (evt) => {
		let value = evt.target.value;
		if (uppercaseMode) {
			const length = value.length;
			const upperCaseChar = value.slice(length - 1, length).toUpperCase();

			value = value.slice(0,-1) + upperCaseChar;
		}

		setMessage(value);
	};

	return (
		<form autoComplete='off' className={classes.form} id='message-from' ref={form} onSubmit={(e) => handleSubmit(e)}>
			<TextField
				onChange={handleInputChange}
				id='messagePanelInput'
				disabled={pending}
				className={classes.textField}
				label='Your Message'
				variant='outlined'
				onKeyPress={handleKeyDown}
				multiline
				rows={5}
				value={message}
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
	);
};

export default MessageForm;
