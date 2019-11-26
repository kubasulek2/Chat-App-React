import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ChatIcon from '@material-ui/icons/Apps';
import ListItemText from '@material-ui/core/ListItemText';


const useStyles = makeStyles(({ palette, spacing }) => ({
	root: {
		flex: '1 1 auto',
		overflowY: 'auto',

	},
	listTitle: {
		paddingTop: spacing(3),
		padding: spacing(2),
		display: 'flex',
		justifyContent: 'flex-start',
		alignItems: 'center',
		background: palette.background.light
	},
	listItem: {
		textTransform: 'uppercase',

	},
	active: {
		fontWeight: 'bold',
		color: palette.primary.main
	},
	titleIcon: {
		color: palette.secondary.main
	},
	titleCaption: {
		paddingLeft: spacing(1),
		fontWeight: 'bold',
	},
	room: {

	}
}));

const RoomsList = ({ rooms }) => {

	const classes = useStyles();

	const roomList = rooms.map((room) => {
		const active = room === 'private' ? true : false;

		return (
			<ListItem key={room} className={`${ classes.room }`} button selected={active}>
				<ListItemText primary={room} classes={{
					primary: active ? `${ classes.active } ${ classes.listItem }` : classes.listItem
				}} />
			</ListItem>
		);
	});

	return (
		<div className={classes.root}>
			<div className={classes.listTitle}>
				<ChatIcon
					className={classes.titleIcon}
				/>
				<Typography
					variant='h5'
					color='textSecondary'
					className={classes.titleCaption}
				>
					Rooms
				</Typography>
			</div>
			<Divider />
			<List component="nav">
				{roomList}
			</List>
		</div>
	);
};

export default RoomsList;
