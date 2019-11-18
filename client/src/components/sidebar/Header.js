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
		flexGrow: 1,
		background: theme.palette.background.light,
		boxShadow: theme.shadows[2],
		zIndex: theme.zIndex.drawer + 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
		[ theme.breakpoints.up('sm') ]: {
			display: 'none',
		},
	},
	title: {
		flexGrow: 1,
		fontWeight: 700
	},
}));

const Header = props => {
	const classes = useStyles();

	return (
		<AppBar position="fixed" className={classes.root}>
			<Toolbar>
				<IconButton 
					edge="start" 
					className={classes.menuButton}
					aria-label="open drawer"
					onClick={props.handleMobile} 
				>
					<MenuIcon />
				</IconButton>
				<Typography variant="h6" className={classes.title}>
					CHAT REACT
				</Typography>
				<Button color="inherit">Logout</Button>
			</Toolbar>
		</AppBar>
	);
};
export default Header;