import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import Loader from '../UI/Loader';
import { formatTime } from '../../utils';

const useStyles = makeStyles(({ breakpoints, spacing, palette }) => ({
	root: {
		position: 'relative',
		marginLeft: 300,
		width: 'calc(100% - 300px)',
		flex: '1 1 auto',
		[ breakpoints.down('md') ]: {
			marginLeft: 0,
			width: '100%',
		},
		padding: spacing(2),
		display: 'block',
		'& b': {
			color: palette.secondary.light
		},
		'& span': {
			color: palette.primary.light
		}
	}
}));

const ChatBoard = ({ messages, pending }) => {
	const classes = useStyles();

	const messageComponents = messages.map((message, i) => {

		if (message.special) return (
			<Typography key={i}>
				<span>{formatTime(message.timestamp)}
				</span> - <b>{message.user} </b>{message.text}
			</Typography>);

		else return (
			<Typography key={i}>
				<span>{formatTime(message.timestamp)}</span> :<b>{message.user}</b> - {message.text}
			</Typography>);
	});

	return (
		<Grid container className={classes.root}>
			{pending ? <Loader color='rgba(66, 66, 66, .4)' /> : null}
			{messageComponents}
		</Grid>
	);
};

export default ChatBoard;
