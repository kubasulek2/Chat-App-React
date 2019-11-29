import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import BlockIcon from '@material-ui/icons/Block';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(({palette}) => ({
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

const ChatList = ({ privateChats, myself }) => {
	const classes = useStyles();
	const list = Object.keys(privateChats).map((key) => {
		return (
			<ListItem key={key} button className={classes.item}>
				<Typography
					color='textPrimary'
					variant='body2'
				>
					{privateChats[key].userName}
				</Typography>	
				<ListItemSecondaryAction className={classes.action}>
					<IconButton edge='end' aria-label='block' size='small'>
						<BlockIcon color='error'/>
					</IconButton>
					<IconButton edge='end' aria-label='close' size='small'>
						<CloseIcon color='action'/>
					</IconButton>
				</ListItemSecondaryAction>
			</ListItem>
		);
	}
	);

	return (
		<List dense={true} className={classes.root}>
			<ListItem key={myself.id} button className={classes.item}>
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
