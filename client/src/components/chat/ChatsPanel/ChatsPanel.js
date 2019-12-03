import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
import MessageIcon from '@material-ui/icons/Message';
import Badge from '@material-ui/core/Badge';
import Zoom from '@material-ui/core/Zoom';

import ChatList from './ChatList.js';

const useStyles = makeStyles(({ palette, breakpoints }) => ({
	card: {
		width: 200,
		position: 'absolute',
		bottom: 212,
		right: 5,
		overflow: 'visible',
		[breakpoints.down('xs')]: {
			bottom: 210,
		}
	},
	expand: {
		cursor: 'pointer',
		display: 'flex',
		justifyContent: 'space-between',
		background: palette.background.light
	},
	chatBadge: {
		color: 'white !important'
	},
	badgeIcon: {
		color: palette.text.primary
	},
	content: {
		padding: 8,
		background: palette.background.light,
		'&:last-child': {
			paddingBottom: 8
		}
	}
}));


const ChatsPanel = ({ chats, room, activeChat, dispatchChat }) => {
	const classes = useStyles();
	const [expanded, setExpanded] = useState(true);
	
	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	const calculateUnread = () => {
		let count = 0;
		Object.values(chats).forEach(value => {
			if (value.unread) {
				count++;
			}
		});

		return count;
	};

	const unreadCount = calculateUnread();
	/* Chat count indicates how many message arrays exists in chat state object. Message array is destroyed if chat is closed, and recreated on new chat or new message from closed chat */
	/* This counting method lets you to not display chat in panel when you click on close chat button, while still being able to receive messages from closed chat, unless you block it.*/
	const chatCount = Object.values(chats).reduce((prev, next) => {
		if (next.messages){
			return ++prev;
		}
		return prev;
	},0);

	return (
		<Zoom in={chatCount > 1} >
			<Card className={classes.card}>
				<Collapse in={expanded} timeout='auto'>
					<CardContent className={classes.content}>

						<ChatList
							chats={chats}
							room={room}
							activeChat={activeChat}
							dispatchChat={dispatchChat}
						/>
					</CardContent>
				</Collapse>
				<CardActions onClick={handleExpandClick} className={classes.expand}>
					<Typography variant='body1' color='primary'>Chats</Typography>
					<Badge
						showZero={false}
						color='secondary'
						badgeContent={unreadCount}
						classes={{
							badge: classes.chatBadge
						}}>
						<MessageIcon className={classes.badgeIcon} />
					</Badge>
				</CardActions>
			</Card>
		</Zoom>
	);
};

export default ChatsPanel;
