import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextFieldsIcon from '@material-ui/icons/TextFields';

import EmojiPicker from '../UI/EmojiPicker';
import IconButton from '../UI/buttons/IconButton';
import ColorPicker from '../UI/ColorPicker';


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
	const { setUppercaseMode, color, setColor, setMessage, setEmojiInfo } = props;

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
			<ColorPicker
				color={color}
				setColor={setColor}
			/>
			<EmojiPicker
				setEmojiInfo={setEmojiInfo}
				setMessage={setMessage}
			/>
		</div>
	);
};

export default BottomPanel;

