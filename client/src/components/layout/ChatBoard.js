import React, { useEffect, useRef } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { formatTime, formatText } from '../../utils';

const useStyles = makeStyles(({ breakpoints, spacing, palette }) => ({
	root: {
		position: 'relative',
		marginLeft: 300,
		width: 'calc(100% - 300px)',
		flex: '1 1 auto',
		overflowY: 'scroll',
		[breakpoints.down('md')]: {
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

const ChatBoard = ({ messages, activeChat }) => {
	const classes = useStyles();
	const boardRef = useRef();
	
	/* Scroll to last message when new message arrive and user has not scrolled up. */
	useEffect(() => {
		if (boardRef.current.lastElementChild) {
			const elHeight = boardRef.current.clientHeight;
			const elScrollTop = boardRef.current.scrollTop;
			const lastChildOffset = boardRef.current.lastChild.offsetTop;
			
			if ((lastChildOffset >= elHeight - 10) && (elHeight + elScrollTop > lastChildOffset - 30)) {
				boardRef.current.lastChild.scrollIntoView();
			}
		}
	}, [messages]);

	/* Scroll to last message when activeChat is changed. */
	useEffect(() => {	
		boardRef.current.lastChild.scrollIntoView();
	},[activeChat]);

	/* Map messages to create message board. */
	const messageComponents = messages.map((message, i) => {
		
		/* if message is location type handle it separately. */
		if(message.location){
			return (
				<Typography key={i}>
					<span>{formatTime(message.timestamp)}</span> - <b>{message.user}</b>:&nbsp; 
					{message.text} 
				</Typography>);
		}

		/* Format message with utility function. */
		const formatedText = formatText(message.text, message.emojiInfo);


		/* if message is special type (system messages) handle it separately. */
		if (message.special) {
			return (
				<Typography key={i}>
					<span>{formatTime(message.timestamp)}
					</span> - <b>{message.user} </b><span style={{ color: message.color }}>{formatedText}</span>
				</Typography>);
		} else {
			return (
				<Typography key={i}>
					<span>{formatTime(message.timestamp)}</span> - <b>{message.user}</b>: <span style={{ color: message.color }}>{formatedText}</span>
				</Typography>);
		}
	});

	return (
		<Grid container className={classes.root} ref={boardRef}>
			{messageComponents}
		</Grid>
	);
};

export default ChatBoard;
