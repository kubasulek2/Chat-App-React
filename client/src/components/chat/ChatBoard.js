import React, { useEffect, useRef, useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { ChatContext } from '../../containers/App';
import { formatTime, formatText } from '../../utils';

const useStyles = makeStyles(({ breakpoints, spacing, palette }) => ({
	root: {
		position: 'relative',
		marginLeft: 300,
		width: 'calc(100% - 300px)',
		flex: '1 1 auto',
		overflowY: 'scroll',
		padding: spacing(2),
		display: 'block',

		'& b': {
			color: palette.secondary.light
		},

		'& span': {
			color: palette.primary.light
		},

		[breakpoints.down('md')]: {
			marginLeft: 0,
			width: '100%',
		},

		'& p:last-child': {
			paddingBottom: 35
		},
	},
	userMessage: {
		'& b': {
			color: palette.secondary.dark
		}
	}
}));

/* Layout center component, responsible for displaying chat messages */
const ChatBoard = () => {
	const classes = useStyles();

	/* Use Context. */
	const { activeChat, chats, userName } = useContext(ChatContext);

	/* Reference component. */
	const boardRef = useRef();

	/* Scroll to last message when new message arrive and user has not scrolled up. */
	useEffect(() => {

		if (boardRef.current.lastChild) {
			const elHeight = boardRef.current.clientHeight;
			const elScrollTop = boardRef.current.scrollTop;
			const lastChildOffset = boardRef.current.lastChild.offsetTop;

			if ((lastChildOffset >= elHeight - 10) && (elHeight + elScrollTop > lastChildOffset - 30)) {
				boardRef.current.lastChild.scrollIntoView();
			}
		}
	}, [chats]);

	/* Scroll to last message when activeChat is changed. */
	useEffect(() => {
		if (boardRef.current.lastChild) {
			boardRef.current.lastChild.scrollIntoView();
		}
	}, [activeChat]);

	/* Filter messages */
	const activeMessages = () => chats[activeChat].messages || [];

	/* Map messages to create message board. */
	const messageComponents = activeMessages().map((message, i) => {
		
		/* if message is location type handle it separately. */
		if (message.location) {
			return (
				<Typography key={i} className={userName === message.sender ? classes.userMessage : null}>
					<span>{formatTime(message.timestamp)}</span> - <b>{message.sender}</b>:&nbsp;
					{message.text}
				</Typography>);
		}

		/* Format message with utility function. */
		const formatedText = formatText(message.text, message.emojiInfo);


		/* if message is special type (system messages) handle it separately. */
		if (message.special) {
			return (
				<Typography key={i} className={userName === message.sender ? classes.userMessage : null}>
					<span>{formatTime(message.timestamp)}
					</span> - <b>{message.sender} </b><span style={{ color: message.color }}>{formatedText}</span>
				</Typography>);
		} else {
			return (
				<Typography key={i} className={userName === message.sender ? classes.userMessage : null}>
					<span>{formatTime(message.timestamp)}</span> - <b>{message.sender}</b>: <span style={{ color: message.color }}>{formatedText}</span>
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
