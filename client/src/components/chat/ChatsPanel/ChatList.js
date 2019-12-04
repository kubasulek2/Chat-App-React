import React, { Fragment, useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import BlockIcon from '@material-ui/icons/Block';
import CloseIcon from '@material-ui/icons/Close';
import Badge from '@material-ui/core/Badge';

import { ChatContext, DispatchContext } from '../../../containers/App';
import IgnoreDialog from '../../UI/feedback/IgnoreDialog';

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
	},
	iconSmall: {
		width: '1.2rem',
		height: '1.2rem'
	},
	chatBadge: {
		backgroundColor: palette.secondary.main,
		top: 4,
		right: -2,
		
	}
}));

/* Displays List of chats when ChatsPanel is expanded. */
const ChatList = () => {
	const classes = useStyles();

	/* Use Context. */
	const { chats, activeChat, room } = useContext(ChatContext);
	const { dispatchChat } = useContext(DispatchContext);

	/* Local State for displaying confirmation dialog, and passing ignore user info to it. */
	const [dialog, setDialog] = useState(false);
	const [ignore, setIgnore] = useState(null);

	/* Switch to clicked chat. */
	const handleChatSelection = (chat) => {
		dispatchChat({ type: 'SET_ACTIVE', active: chat });
	};

	/* Close clicked chat. */
	const handleCloseChat = (chatName) => {
		dispatchChat({ type: 'CLOSE', chatName });
	};

	/* Open ignore dialog and create user info object to pass to it.  */
	const handleBlockUser = (id, name) => {
		setDialog(true);
		setIgnore({ id, name });
	};

	/* map all non room chats to listItems. */
	const list = Object.keys(chats).filter(key => key !== room).map((key) => {

		return (
			<ListItem
				key={key}
				button className={classes.item}
				onClick={() => handleChatSelection(key)}
			>
				<Badge
					invisible={!chats[key].unread}
					color='secondary'
					variant='dot'
					classes={{
						badge: classes.chatBadge
					}}
				>
					<Typography
						className={activeChat === key ? classes.active : null}
						color='textPrimary'
						variant='body2'
					>
						{key}
					</Typography>
				</Badge>
				<ListItemSecondaryAction className={classes.action}>
					<IconButton
						edge='end'
						aria-label='block'
						size='small'
						onClick={() => handleBlockUser(chats[key].id, key)}
					>
						<BlockIcon color='error' className={classes.iconSmall} />
					</IconButton>
					<IconButton
						edge='end'
						aria-label='close'
						size='small'
						onClick={() => handleCloseChat(key)}
					>
						<CloseIcon color='secondary' className={classes.iconSmall} />
					</IconButton>
				</ListItemSecondaryAction>
			</ListItem>
		);
	}
	);

	return (
		<Fragment>
			{dialog
				? <IgnoreDialog
					open={dialog}
					handleOpen={setDialog}
					ignore={ignore}
					setIgnore={setIgnore}
				/>
				: null
			}
			<List dense={true} className={classes.root}>
				<ListItem
					key={room}
					button className={classes.item}
					onClick={() => handleChatSelection(room)}
				>	<Badge
						invisible={!chats[room].unread}
						color='secondary'
						variant='dot'
						classes={{
							badge: classes.chatBadge
						}}
					>
						<Typography
							color='textPrimary'
							className={activeChat === room ? classes.active : null}
							variant='body2'
						>
							{room.toUpperCase()}

						</Typography>
					</Badge>
				</ListItem>
				{list}
			</List>
		</Fragment>
	);
};

export default ChatList;
