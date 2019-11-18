import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles(({palette, spacing}) => ({
	root: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100vw',
		height: '100vh',
	},
	card: {
		width: 345,
	},
	inputContainer: {
		marginBottom: spacing(2)
	},
	textField: {
		width: '100%',
		padding: 0
	},
	button: {
		width: '100%',
		borderRadius: 4,
		fontSize: 20,
		color: palette.grey[300],
		textTransform: 'capitalize'
	}
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
							<Grid container alignItems="center">
								<Grid item>
									<AccountCircle />
								</Grid>
								<Grid item>
									<TextField
										id="filled-basic"
										className={classes.textField}
										label="User name"
										variant="outlined"
									/>
								</Grid>
							</Grid>
						</div>
						<Button 
							variant='contained' 
							color='primary'
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
