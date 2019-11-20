import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { formatTime } from '../../utils';

const useStyles = makeStyles(({ breakpoints, spacing, palette }) => ({
	root: {
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
			color: palette.primary.light
		}
	}
}));

const ChatBoard = ({ messages }) => {
	const classes = useStyles();

	const messageComponents = messages.map((message, i) => <Typography key={i}><b>{formatTime(message.timestamp)}</b> - {message.text}</Typography>);

	return (
		<Grid container className={classes.root}>
			{messageComponents}
		</Grid>
	);
};

export default ChatBoard;
