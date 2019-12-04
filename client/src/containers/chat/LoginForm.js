import React, { useState, useRef, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';

import { DispatchContext, AppStateContext } from '../../containers/App';
import { socket } from '../../server/socket';
import Tooltip from '../../components/UI/feedback/Tooltip';
import { Typography } from '@material-ui/core';
import Loader from '../../components/UI/Loader';

const useStyles = makeStyles(({ palette, spacing }) => ({
	root: { position: 'relative' },
	errorMessage: {
		margin: 8
	},
	inputContainer: {
		marginBottom: spacing(1.5)
	},
	textField: {
		width: '100%',
		padding: 0,
		'& .MuiInputBase-input': {
			paddingTop: 14,
			paddingBottom: 14,
		},
		'& .MuiInputBase-root': {
			paddingLeft: 8
		}
	},
	loginIcon: {
		color: palette.primary.main
	},
	button: {
		width: '100%',
		borderRadius: 4,
		fontSize: 20,
		color: palette.grey[300],
		textTransform: 'capitalize'
	},
	border: { borderRadius: 4 },
}));

/* Stateful Component -  handles frontEnd login logic. */
const LoginForm = () => {
	const classes = useStyles();

	/* Use context */
	const { pending } = useContext(AppStateContext);
	const { dispatchAppState } = useContext(DispatchContext);

	/* Local states. */
	const [userName, setUserName] = useState('');
	const [disabled, setDisabled] = useState(true);
	const [disableMessage, setDisableMessage] = useState('User name must have at least 5 characters, at least one letter, and contain no spaces');
	const [loginError, setLoginError] = useState('');
	const [validate] = useState(/^(?=.*[a-zA-Z])[^\t\s]{5,12}$/);

	/* Input reference. */
	const loginInput = useRef();

	/* Input is always focused. */
	useEffect(() => loginInput.current.focus(), []);

	/* Validate and submit login */
	const handleLogin = evt => {
		evt.preventDefault();

		if (!validate.test(userName)) {
			return;
		}

		dispatchAppState({ type: 'SET_PENDING', pending: true });
		setDisabled(true);
		setLoginError('');
		setUserName('');

		/* Send event to the server with login data */
		socket.emit('login', { userName: userName, roomName: 'public' }, (error) => {

			if (error) {
				/* Set local error on error message from server */
				setLoginError(error);
				return dispatchAppState({ type: 'SET_PENDING', pending: false });
			}
		});

	};

	/* Handle input change, disable and enable login button, display or hide info Tooltip*/
	const handleChange = evt => {
		if (disabled && validate.test(evt.target.value)) {
			setDisabled(false);
			setDisableMessage('');
		}
		else if (!disabled && !validate.test(evt.target.value)) {
			setDisabled(true);
			setDisableMessage('User name must have from 5 to 12 characters, at least one letter, and contain no spaces');
		}

		setUserName(evt.target.value);
	};

	const button = (
		<Button
			form={'login-form'}
			type='submit'
			disabled={disabled}
			variant='contained'
			color='secondary'
			className={classes.button}
		>
			continue
		</Button>
	);

	const buttonWithTooltip = (
		<Tooltip
			message={disableMessage}
		>
			<div>
				{button}
			</div>
		</Tooltip>
	);

	return (
		<form className={classes.root} onSubmit={handleLogin} id='login-form'>
			{pending ? <Loader color='#313132' /> : null}
			<Typography
				className={classes.errorMessage}
				color='error'
				variant='subtitle2'
				align='center'
			>
				{loginError}&nbsp;
			</Typography>
			<div className={classes.inputContainer}>
				<TextField
					inputRef={loginInput}
					disabled={pending}
					value={userName}
					onChange={handleChange}
					className={classes.textField}
					placeholder="User name"
					variant="outlined"
					InputProps={{
						startAdornment: (
							<InputAdornment
								position="start"
							>
								<AccountCircle
									className={classes.loginIcon}
									fontSize='large'
								/>
							</InputAdornment>
						),
						classes: { root: classes.border }
					}}
				/>
			</div>
			{disableMessage ? buttonWithTooltip : button}
		</form>
	);
};

export default LoginForm;
