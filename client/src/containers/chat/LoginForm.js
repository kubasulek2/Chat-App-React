import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';

import { socket } from '../../server/socket';
import Tooltip from '../../components/UI/Tooltip';

const useStyles = makeStyles(({ palette, spacing }) => ({
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

const LoginForm = () => {
	const classes = useStyles();
	const [ user, setUser ] = useState('');
	const [ disabled, setDisabled ] = useState(true);

	useEffect(() => {

		return () => socket.removeAllListeners('user');
	}, []);

	const handleLogin = evt => {
		evt.preventDefault();
	};
	const handleChange = evt => {
		if (disabled && evt.target.value.length >= 5) setDisabled(false);
		else if (!disabled && evt.target.value.length < 5) setDisabled(true);
		setUser(evt.target.value);
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
			message={'User name must have at least 5 characters'}
		>
			<div>
				{button}
			</div>
		</Tooltip>
	);

	return (
		<form>
			<div className={classes.inputContainer}>
				<TextField
					value={user}
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
			{disabled ? buttonWithTooltip : button}
		</form>
	);
};

export default LoginForm;
