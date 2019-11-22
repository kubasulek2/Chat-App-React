import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ColorizeIcon from '@material-ui/icons/Colorize';
import EmojiIcon from '@material-ui/icons/EmojiEmotions';
import TextFieldsIcon from '@material-ui/icons/TextFields';

import IconButton from '../UI/buttons/IconButton';

const useStyles = makeStyles(({ spacing, palette }) => ({
	root: {
		display: 'flex',
		alignItems: 'flex-end',
		marginRight: spacing(1)
	},
	icon: {
		color: '#b0bec5'
	},
	caseIcon: {
		color: props => props.uppercaseMode ? palette.secondary.dark : '#b0bec5'
	}
}));


const BottomPanel = (props) => {
	const classes = useStyles(props);
	const { setUppercaseMode } = props;
	
	const handleCase = () => {
		setUppercaseMode(prevMode => !prevMode);
	};

	return (
		<div className={classes.root}>
			<IconButton
				clicked={handleCase}
			>
				<TextFieldsIcon className={classes.caseIcon} />
			</IconButton>
			<IconButton>
				<ColorizeIcon className={classes.icon} />
			</IconButton>
			<IconButton>
				<EmojiIcon className={classes.icon} />
			</IconButton>
		</div>
	);
};

export default BottomPanel;

