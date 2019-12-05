import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
import MessageIcon from '@material-ui/icons/Message';
import Badge from '@material-ui/core/Badge';
import Zoom from '@material-ui/core/Zoom';

import { ChatContext } from '../../../containers/App';
import ChatList from './ChatList.js';

const useStyles = makeStyles(({ palette, breakpoints }) => ({
	card: {
		width: 200,
		position: 'fixed',
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
		'&:last-child': {
			paddingBottom: 8
		}
	}
}));

/* Stateful Component - displays side panel with private chats list */
const ChatsPanel = () => {
	const classes = useStyles();
	
	/* Use Context. */
	const { chats } = useContext(ChatContext);

	/* Local state to expand and contract panel */
	const [expanded, setExpanded] = useState(true);

	/* Handle expand contract panel. */
	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	/* Calculate how many chats have unread messages */
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

	/* How many open chats. */
	const chatCount = Object.keys(chats).length;
	
	return (
		<Zoom in={chatCount > 1} >
			<Card className={classes.card}>
				<Collapse in={expanded} timeout='auto'>
					<CardContent className={classes.content}>

						<ChatList />
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

export default React.memo(ChatsPanel);
