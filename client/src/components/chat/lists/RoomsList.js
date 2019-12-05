import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ChatIcon from '@material-ui/icons/Apps';
import ListItemText from '@material-ui/core/ListItemText';

import { DispatchContext, ChatInfoContext } from '../../../containers/App';
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

/* Component displays chat available rooms */
const RoomsList = () => {
	const classes = useStyles();
	
	/* Use Context. */
	const { rooms, myself } = useContext(ChatInfoContext);
	const { dispatchAppState } = useContext(DispatchContext);

	/* Change room handler */
	const handleRoomClick = (room) => {
		
		/* Emit socket event of room change */
		socket.emit('switchRoom', { roomName: room, createNew: false }, (error) => {

			if (error) {
				return dispatchAppState({ type: 'SET_ERROR', errType: error.type, message: error.message });
			}
		});
	};

	/* Map existing rooms. */
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

export default React.memo(RoomsList);
