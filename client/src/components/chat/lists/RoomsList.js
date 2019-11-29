import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ChatIcon from '@material-ui/icons/Apps';
import ListItemText from '@material-ui/core/ListItemText';

import { socket } from '../../../server/socket';


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

const RoomsList = ({ rooms, myself, setError }) => {
	const classes = useStyles();
	
	myself = myself || {};

	const handleRoomClick = (room) => {

		socket.emit('switchRoom', { roomName: room, createNew: false }, (error) => {

			if (error) {
				return setError(error.message);
			}
		});
	};

	const roomsList = rooms.map((room) => (
		<ListItem
			key={room}
			className={`${ classes.room }`}
			button
			onClick={room === myself.room ? () => { } : () => handleRoomClick(room)}
		>
			<ListItemText primary={room} classes={{
				primary: room === myself.room ? `${ classes.active } ${ classes.listItem }` : classes.listItem
			}} />
		</ListItem>
	));

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
				{roomsList}
			</List>
		</div>
	);
};

export default RoomsList;
