import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles(theme => ({
	root: {
		flex:'0 1 auto',
		background: theme.palette.background.light,
		boxShadow: theme.shadows[0],
		position: 'relative',
		zIndex: theme.zIndex.drawer + 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
		[ theme.breakpoints.up('lg') ]: {
			display: 'none',
		},
		padding: 6
	},
	iconContainer: {
		width: 35,
		height: 35
	},
	menuIcon: {
		width: '100%',
		height: '100%'
	},
	title: {
		flexGrow: 1,
		fontWeight: 700
	},
}));

const Header = props => {
	const classes = useStyles();

	return (
		<AppBar className={classes.root}>
			<Toolbar>
				<IconButton 
					edge='start' 
					className={classes.menuButton}
					aria-label='open drawer'
					onClick={props.handleMobile} 
				>
					<div className={classes.iconContainer}>
						<MenuIcon className={classes.menuIcon}/>
					</div>
				</IconButton>
				<Typography variant='h6' className={classes.title}>
					CHAT REACT
				</Typography>
				<Button color='inherit'>Logout</Button>
			</Toolbar>
		</AppBar>
	);
};
export default Header;