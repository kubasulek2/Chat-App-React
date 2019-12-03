import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import UserIcon from '@material-ui/icons/Person';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';

import { socket } from '../../../server/socket';

const useStyles = makeStyles(({ palette, spacing, breakpoints }) => ({
	root: {
		flex: '1 1 auto',
		overflowY: 'auto',
		paddingBottom: 206,
		[breakpoints.down('md')]: {
			paddingBottom: 67 + spacing(2)
		}

	},
	me: {
		fontWeight: 'bold',
		color: palette.primary.main
	},
	listTitle: {
		background: palette.background.light,
		padding: spacing(2),
		display: 'flex',
		justifyContent: 'flex-start',
		alignItems: 'center',

	},
	titleIcon: {
		color: palette.secondary.main
	},
	titleCaption: {
		paddingLeft: spacing(1),
		fontWeight: 'bold',
	},
	user: {
		cursor: 'initial'
	}
}));

const UsersList = ({ users, myself, dispatchAppState, ignoredUsers }) => {
	const classes = useStyles();
	let usersList = null;

	const handlePrivateChat = (evt) => {
		const id = evt.currentTarget.dataset.id;

		socket.emit('privateChatRequest', id, (error) => {
			if (error) {
				return dispatchAppState({ type: 'SET_ERROR', message: error.message, errType: error.type });
			}
		});
	};

	const button = (id, name) => (
		<IconButton edge="end" aria-label="private-conversation" onClick={handlePrivateChat} data-id={id} data-name={name}>
			<CommentIcon color='primary' />
		</IconButton>
	);

	if (users.length) {
		usersList = [...users];
		const index = usersList.findIndex(el => el.id === myself.id);
		const me = usersList.splice(index, 1);
		usersList.unshift(...me);

		usersList = usersList.map((user, i) => (
			<ListItem
				key={user.id + i}
				className={classes.user}
				button
			>
				<ListItemText secondary={<span className={i === 0 ? classes.me : null} >{user.userName}</span>} />
				<ListItemSecondaryAction>
					{i !== 0 && !ignoredUsers.includes(user.id) ? button(user.id, user.userName) : null}
				</ListItemSecondaryAction>
			</ListItem>
		));
	}



	return (
		<div className={classes.root}>
			<div className={classes.listTitle}>
				<UserIcon className={classes.titleIcon} />
				<Typography variant='h5' color='textSecondary' className={classes.titleCaption}>Users</Typography>
			</div>
			<Divider />
			<List component="nav">
				{usersList}
			</List>
		</div>
	);
};

export default UsersList;
