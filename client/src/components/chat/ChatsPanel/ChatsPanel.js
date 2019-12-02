import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
import MessageIcon from '@material-ui/icons/Message';
import Badge from '@material-ui/core/Badge';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

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


const ChatsPanel = ({ chat, dispatchChat }) => {
	const classes = useStyles();
	const [expanded, setExpanded] = useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};
	const handleClickAway = () => {
		if (expanded){
			setExpanded(false);
		}
	};

	return (
		Object.keys(chat.chats).length > 1
			? <ClickAwayListener onClickAway={handleClickAway}>
				<Card className={classes.card}>
					<Collapse in={expanded} timeout='auto'>
						<CardContent className={classes.content}>
							
							<ChatList 
								chat={chat} 
								dispatchChat={dispatchChat}
							/>
						</CardContent>
					</Collapse>
					<CardActions onClick={handleExpandClick} className={classes.expand}>
						<Typography variant='body1' color='primary'>Chats</Typography>
						<Badge
							color='secondary'
							badgeContent={1}
							invisible={expanded}
							classes={{
								badge: classes.chatBadge
							}}>
							<MessageIcon className={classes.badgeIcon} />
						</Badge>
					</CardActions>
				</Card>
			</ClickAwayListener>
			: null
	);
};

export default ChatsPanel;
