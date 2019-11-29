import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import MessagePanel from '../../containers/chat/MessagePanel';

const useStyles = makeStyles(({ breakpoints, spacing }) => ({
	root: {
		marginLeft: 300,
		width: 'calc(100% - 300px)',
		flex: '0 1 auto',
		[breakpoints.down('md')]: {
			marginLeft: 0,
			width: '100%',
		},
		padding: spacing(2),
		paddingBottom: spacing(1)
	}
}));

const Footer = ({ pending, setPending, setError, activeChat }) => {
	const classes = useStyles();
	return (
		<footer className={classes.root}>
			<MessagePanel
				pending={pending}
				setPending={setPending}
				setError={setError}
				activeChat={activeChat}
			/>
		</footer>
	);
};

export default Footer;