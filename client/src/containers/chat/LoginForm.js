import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';

import { socket } from '../../server/socket';
import Tooltip from '../../components/UI/Tooltip';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(({ palette, spacing }) => ({
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
		color: palette.grey[ 300 ],
		textTransform: 'capitalize'
	},
	border: { borderRadius: 4 },
}));

const LoginForm = ({ pending, setPending }) => {
	const classes = useStyles();
	const [ userName, setUserName ] = useState('');
	const [ disabled, setDisabled ] = useState(true);
	const [ disableMessage, setDisableMessage ] = useState('User name must have at least 5 characters');
	const [ loginError, setLoginError ] = useState('');

	useEffect(() => {
		socket.on('userError', error => {
			setLoginError(error);
			setPending(false);
		});
		return () => socket.removeAllListeners('userError');
	}, []);

	const handleLogin = evt => {
		evt.preventDefault();
		setDisabled(true);
		setLoginError('');
		socket.emit('login', userName);
	};
	const handleChange = evt => {

		if (disabled && evt.target.value.length >= 5) {
			setDisabled(false);
			setDisableMessage('');
		}
		else if (!disabled && evt.target.value.length < 5) {
			setDisabled(true);
			setDisableMessage('User name must have at least 5 characters');
		}

		setUserName(evt.target.value);
	};

	const button = (
		<Button
			disabled={disabled}
			variant='contained'
			color='secondary'
			className={classes.button}
			onClick={handleLogin}
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
		<form>
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
