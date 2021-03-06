import React, { useRef, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import { AppStateContext, ChatContext } from '../../containers/App';

const useStyles = makeStyles(({ spacing, palette }) => ({
	form: {
		width: '100%',
		display: 'flex'
	},
	cssOutlinedInput: {
		caretColor: props => props.color,
		color: props => props.color,
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

/* Message form, typing chat messages here. */
const MessageForm = (props) => {
	const classes = useStyles(props);

	/* references */
	const textInput = useRef();
	const form = useRef();

	/* Use Context. */
	const { pending } = useContext(AppStateContext);
	const { activeChat } = useContext(ChatContext);

	const { message, setMessage, handleSubmit, uppercaseMode, color } = props;

	/* Focus input to improve user experience */
	useEffect(() => {
		if (textInput.current.id !== document.activeElement.id) {
			setTimeout(() => textInput.current.focus(), 200);
		}
	}, [uppercaseMode, color, message, activeChat]);

	/* Handle enter keyDown */
	const handleKeyDown = (evt) => {

		/* Don't submit form when shift + enter. New line instead */
		if (evt.key === 'Enter' && evt.shiftKey && document.activeElement.id === textInput.current.id) {
			return;
		}
		/* Submit when enter without shift. */
		else if (evt.key === 'Enter' && document.activeElement.id === textInput.current.id) {
			handleSubmit(evt);
		}
	};

	/* Handle input change. Change letter case when user picked uppercase mode */
	const handleInputChange = (evt) => {
		let value = evt.target.value;
		if (uppercaseMode) {
			const length = value.length;
			const upperCaseChar = value.slice(length - 1, length).toUpperCase();

			value = value.slice(0, -1) + upperCaseChar;
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
