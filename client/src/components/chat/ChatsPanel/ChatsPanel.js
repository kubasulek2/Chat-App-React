import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
import MessageIcon from '@material-ui/icons/Message';
import Badge from '@material-ui/core/Badge';


const useStyles = makeStyles(({ shadows, palette }) => ({
	card: {
		width: 200,
		position: 'absolute',
		bottom: 2,
		right: 5,
		overflow: 'visible',
	},
	expand: {
		cursor: 'pointer',
		display: 'flex',
		justifyContent: 'space-between',
	},
	chatBadge: {
		color: 'white !important'
	},
	badgeIcon: {
		color: palette.text.primary
	}
}));


const ChatList = ({ privateChats }) => {
	const classes = useStyles();
	const [expanded, setExpanded] = useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	return (
		privateChats.length
			? <Card className={classes.card}>
				<Collapse in={expanded} timeout='auto' unmountOnExit>
					<CardContent>
						<Typography paragraph>Method:</Typography>
						<Typography paragraph>
							Heat 1/2 cup of the broth in a pot until simmering, add saffron and
							set aside for 10 minutes.
						</Typography>
					</CardContent>
				</Collapse>
				<CardActions onClick={handleExpandClick} className={classes.expand}>
					<Typography variant='body1' color='primary'>Chats</Typography>
					<Badge
						color='secondary'
						badgeContent={1}
						invisible={expanded}
						classes={{
							badge:classes.chatBadge
						}}>
						<MessageIcon className={classes.badgeIcon} />
					</Badge>
				</CardActions>
			</Card>
			: null
	);
};

export default ChatList;
