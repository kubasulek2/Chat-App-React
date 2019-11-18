import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	root: {
		
	},
	toolbar: theme.mixins.toolbar,
	drawerPaper: {
		width: 300,
		[ theme.breakpoints.down('sm') ]: {
			width: 240,
			flexShrink: 0,
		},
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
			<Hidden lgUp implementation='css'>
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
			<Hidden mdDown implementation='css'>
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