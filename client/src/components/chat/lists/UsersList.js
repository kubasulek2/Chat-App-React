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

const useStyles = makeStyles(({ palette, spacing, breakpoints }) => ({
	root: {
		flex: '1 1 auto',
		overflowY: 'auto',
		paddingBottom: 206,
		[breakpoints.down('md')]: {
			paddingBottom: spacing(2)
		}
		
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

const UsersList = () => {
	const users = ['Kuba', 'Franio666', 'Karo1', 'BigButt','22edd','2fgh','hanka','stasio'];
	const classes = useStyles();
	const roomList = users.map((user) => {
		return (
			<ListItem key={user} className={classes.user} button>
				<ListItemText secondary={user} />
				<ListItemSecondaryAction>
					<IconButton edge="end" aria-label="private-conversation">
						<CommentIcon color='primary' />
					</IconButton>
				</ListItemSecondaryAction>
			</ListItem>
		);
	});

	return (
		<div className={classes.root}>
			<div className={classes.listTitle}>
				<UserIcon className={classes.titleIcon}/>
				<Typography variant='h5' color='textSecondary' className={classes.titleCaption}>Users</Typography>
			</div>
			<Divider />
			<List component="nav">
				{roomList}
			</List>
		</div>
	);
};

export default UsersList;
