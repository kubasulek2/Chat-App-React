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

const MessageForm = ({message, setMessage, pending}) => {
	const classes = useStyles();
	const textInput = useRef();

	useEffect(() => {
		textInput.current.focus();
	});

	return (
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
	);
};

export default MessageForm;
