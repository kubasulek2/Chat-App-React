import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
	root: {
		[ theme.breakpoints.up('sm') ]: {
			width: drawerWidth,
			flexShrink: 0,
		},
	},
	toolbar: theme.mixins.toolbar,
	drawerPaper: {
		width: 300,
	}
}));

const DrawerComponent = props => {

	const classes = useStyles();

	const drawer = (
		<div>
			<div className={classes.toolbar} />
		</div>
	);

	return (
		<nav className={classes.root}>
			<Hidden smUp implementation='css'>
				<Drawer
					variant='temporary'
					open={props.mobile}
					onClose={props.handleMobile}
					classes={{
						paper: classes.drawerPaper,
					}}
					ModalProps={{
						keepMounted: true
					}}
				>
					{drawer}
				</Drawer>
			</Hidden>
			<Hidden xsDown implementation='css'>
				<Drawer
					classes={{
						paper: classes.drawerPaper,
					}}
					variant='permanent'
					open
				>
					{drawer}
				</Drawer>
			</Hidden>
		</nav>
	);
};


export default DrawerComponent;