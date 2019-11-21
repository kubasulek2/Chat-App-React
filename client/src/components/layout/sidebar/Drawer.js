import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';

import RoomsList from '../../chat/lists/RoomsList';
import UsersList from '../../chat/lists/UsersList';

const useStyles = makeStyles(({ mixins, palette, breakpoints }) => ({
	toolbar: mixins.toolbar,
	drawerPaper: {
		width: 300,
		[breakpoints.down('sm')]: {
			width: 240,
			flexShrink: 0,
		},
	},
	footer: {
		borderTop: '1px solid rgba(66, 66, 66, .4)',
		borderRight: '1px solid rgba(66, 66, 66, .4)',
		position: 'fixed',
		bottom: 0,
		left: 0,
		width: 300,
		height: 207,
		background: palette.background.default,
		[breakpoints.down('sm')]: {
			width: 240,
		},
	}
}));

const DrawerComponent = props => {

	const classes = useStyles();

	const drawer = (
		<div>
			<div className={classes.toolbar} />
			<RoomsList />
			<Divider />
			<UsersList />
			<div className={classes.footer}></div>
		</div>
	);

	return (
		<nav>
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