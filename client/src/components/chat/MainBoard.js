import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { socket } from '../../server/socket';

const useStyles = makeStyles(({ breakpoints, spacing }) => ({
	root: {
		marginLeft: 300,
		width: 'calc(100% - 300px)',
		flex: '1 1 auto',
		[ breakpoints.down('md') ]: {
			marginLeft: 0,
			width: '100%',
		},
		padding: spacing(2),
		display: 'block'
	}
}));

const ChatBoard = () => {
	const classes = useStyles();
	const [ messages, setMessages ] = useState([]);
	useEffect(() => {
		
		socket.on('locationMessage', link => {
			setMessages(messageArray => [...messageArray, <a key={link} rel='noopener noreferrer' target='_blank' href={link}>location</a>]);
		});
		
		socket.on('message', message => {
			setMessages(messageArray => [ ...messageArray, message ]);
		});
		socket.on('welcome', message => {
			setMessages(messageArray => [ ...messageArray, message ]);
		});
	}, []);


	const messageComponents = messages.map((message, i) => <Typography key={i}>{message}</Typography>);
	return (
		<Grid container className={classes.root}>
			{messageComponents}
		</Grid>
	);
};

export default ChatBoard;
