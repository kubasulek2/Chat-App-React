import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles(({ palette, spacing }) => ({
	root: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100vw',
		height: '100vh',
	},
	card: {
		width: 345,
		padding: `${ spacing(3) }px ${ spacing(1) }px`
	},
	inputContainer: {
		marginBottom: spacing(2)
	},
	textField: {
		width: '100%',
		padding: 0,
		'& .MuiInputBase-input': {
			paddingTop: 14,
			paddingBottom: 14,
		},
		'& .MuiInputBase-root':{
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

const Login = () => {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<Card className={classes.card}>
				<CardHeader
					className={classes.media}
					title="Paella dish"
				/>
				<CardContent>
					<form>
						<div className={classes.inputContainer}>
							<TextField
								id="filled-basic"
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
						<Button
							variant='contained'
							color='secondary'
							className={classes.button}
						>
							continue
						</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}

export default Login;
