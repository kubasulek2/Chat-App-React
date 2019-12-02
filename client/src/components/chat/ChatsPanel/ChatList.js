import React, { Fragment, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import BlockIcon from '@material-ui/icons/Block';
import CloseIcon from '@material-ui/icons/Close';

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
	}
}));

const ChatList = ({ chat, dispatchChat }) => {
	const classes = useStyles();
	const [dialog, setDialog] = useState(false);
	const [ignore, setIgnore] = useState(null);
	const { activeChat, room, chats } = chat;


	const handleChatSelection = (chat) => {
		dispatchChat({ type: 'SET_ACTIVE', active: chat });
	};

	const handleCloseChat = (chatName) => {
		dispatchChat({ type: 'CLOSE', chatName });
	};

	const handleBlockUser = (id, name) => {
		setDialog(true);
		setIgnore({ id, name });
	};

	const list = Object.keys(chats).filter(key => key !== room).map((key) => {

		return (
			<ListItem
				key={key}
				button className={classes.item}
				onClick={() => handleChatSelection(key)}
			>
				<Typography
					className={activeChat === key ? classes.active : null}
					color='textPrimary'
					variant='body2'
				>
					{key}
				</Typography>
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
					dispatchChat={dispatchChat} />
				: null
			}
			<List dense={true} className={classes.root}>
				<ListItem
					key={room}
					button className={classes.item}
					onClick={() => handleChatSelection(room)}
				>
					<Typography
						color='textPrimary'
						className={activeChat === room ? classes.active : null}
						variant='body2'
					>
						{room.toUpperCase()}
					</Typography>
				</ListItem>
				{list}
			</List>
		</Fragment>
	);
};

export default ChatList;
