import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ColorizeIcon from '@material-ui/icons/Colorize';
import EmojiIcon from '@material-ui/icons/EmojiEmotions';
import TextFieldsIcon from '@material-ui/icons/TextFields';

import IconButton from '../UI/buttons/IconButton';

const useStyles = makeStyles(({ spacing }) => ({
	root: {
		display: 'flex',
		marginRight: spacing(1)
	},
	icon: {
		color: '#b0bec5'
	}
}));


const BottomPanel = () => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<IconButton>
				<TextFieldsIcon className={classes.icon}/>
			</IconButton>
			<IconButton>
				<ColorizeIcon className={classes.icon}/>
			</IconButton>
			<IconButton>
				<EmojiIcon className={classes.icon}/>
			</IconButton>
		</div>
	);
};

export default BottomPanel;

