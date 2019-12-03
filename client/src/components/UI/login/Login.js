import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import { ReactComponent as LogoIcon } from '../../../assets/logo.svg';
import LoginForm from '../../../containers/chat/LoginForm';


const xxs = '@media (max-width:400px)';
const useStyles = makeStyles(({ spacing }) => ({
	root: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100vw',
		height: '100vh',
	},
	card: {
		width: 345,
		padding: `${ spacing(3) }px ${ spacing(1) }px`,
		[xxs]: {
			width: '95%',
			minWidth: 300
		}
	},
	media: {
		display: 'flex',
		justifyContent: 'center',
	},
	icon: {
		width: '50px',
		height: '50px'
	},
	welcome: {
		margin: '16px 0 0',
		fontSize: 26,
		fontWeight: 'bold',
		[xxs]: {
			fontSize: 24,
		}
	}


}));

const Login = ({ pending, dispatchAppState }) => {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<Card className={classes.card}>
				<CardMedia
					className={classes.media}
				>
					<LogoIcon className={classes.icon} />
				</CardMedia>
				<Typography
					className={classes.welcome}
					align='center'
					color='textSecondary'
				>Welcome to React Chat</Typography>
				<CardContent>
					<LoginForm
						pending={pending}
						dispatchAppState={dispatchAppState}
					/>
				</CardContent>
			</Card>
		</div>
	);
};

export default Login;
