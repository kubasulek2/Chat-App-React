import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import BlockIcon from '@material-ui/icons/Block';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(({ palette }) => ({
	root: {
		flexGrow: 1,
		maxHeight: 200,
		overflowY: 'auto',
	},
	active: {
		color: palette.primary.main,
		fontWeight: 'bold',
	},
	item: {
		paddingLeft: 4,
		paddingRight: 4,
		color: palette.text.primary,
		marginBottom: 4
	},
	action: {
		right: 8
	}
}));

const ChatList = ({ chats, dispatchChat }) => {
	const classes = useStyles();

	const handleChatSelection = (chat) => {
		dispatchChat({ type: 'SET_ACTIVE', active: chat });
	};

	const list = Object.keys(chats).filter(chat => chat !== 'main').map((key) => {
		return (
			<ListItem
				key={key}
				button className={classes.item}
				onClick={() => handleChatSelection(key)}
			>
				<Typography
					color='textPrimary'
					variant='body2'
				>
					{chats[key].userName}
				</Typography>
				<ListItemSecondaryAction className={classes.action}>
					<IconButton edge='end' aria-label='block' size='small'>
						<BlockIcon color='error' />
					</IconButton>
					<IconButton edge='end' aria-label='close' size='small'>
						<CloseIcon color='action' />
					</IconButton>
				</ListItemSecondaryAction>
			</ListItem>
		);
	}
	);

	return (
		<List dense={true} className={classes.root}>
			<ListItem
				key={chats.main.id}
				button className={classes.item}
				onClick={() => handleChatSelection('main')}
			>
				<Typography
					color='textPrimary'
					className={classes.active}
					variant='body2'
				>
					{myself.room.toUpperCase()}
				</Typography>
			</ListItem>
			{list}
		</List>
	);
};

export default ChatList;
