import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';

import RoomsList from '../../chat/lists/RoomsList';
import UsersList from '../../chat/lists/UsersList';
import NewRoom from '../../../containers/chat/NewRoom';

const useStyles = makeStyles(({ mixins, palette, breakpoints }) => ({
	toolbar: {
		...mixins.toolbar,
		[breakpoints.down('md')]: {
			display: 'none'
		}
	},
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
		justifyContent: 'center',
		alignItems: 'flex-end',
		display: 'flex',
		bottom: 0,
		left: 0,
		width: 300,
		height: 207,
		background: palette.background.default,
		[breakpoints.down('sm')]: {
			width: 240,
		},
		[breakpoints.down('md')]: {
			height: 'initial'
		}
	}
}));
/* Component containing side navigation, behaves differently depends on screen size. */
const DrawerComponent = ({ mobile, handleMobile }) => {

	const classes = useStyles();

	/* Drawer contents. */
	const drawer = (
		<div>
			<div className={classes.toolbar} />
			<RoomsList />

			<Divider />
			<UsersList />
			<div className={classes.footer}>
				<NewRoom />
			</div>
		</div>
	);

	return (
		<nav>
			<Hidden lgUp implementation='css'>
				<Drawer
					variant='temporary'
					open={mobile}
					onClose={handleMobile}
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