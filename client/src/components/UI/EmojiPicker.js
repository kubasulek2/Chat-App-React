import React, { Fragment, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import EmojiIcon from '@material-ui/icons/EmojiEmotions';
import 'emoji-mart/css/emoji-mart.css';
import data from 'emoji-mart/data/messenger.json';
import { NimblePicker } from 'emoji-mart';



import IconButton from '../UI/buttons/IconButton';


const useStyles = makeStyles(({ spacing, palette }) => ({
	icon: {
		color: '#b0bec5'
	},
	popover: {
		padding: spacing(1.5),
		paddingBottom: spacing(2),
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'center',
	},
	color: {
		cursor: 'pointer',
		margin: spacing(.6),
		width: 25,
		height: 25,
		border: '1px solid ' + palette.grey[500],
		borderRadius: 4,
	},
	'@global': {
		'.emoji-mart': {
			color: palette.text.primary,
			background: palette.background.paper,
			borderColor: 'rgba(66,66,66,.6)',

		},
		'.emoji-mart-category-label span': {
			borderColor: 'rgba(66,66,66,.6)',
			background: palette.background.light,
		},
		'.emoji-mart-bar': {
			borderColor: 'rgba(66,66,66,.4)',
			background: palette.background.light,
		},
		'.emoji-mart-search': {
			'& #emoji-mart-search-1': {
				borderColor: 'rgba(66,66,66,.4)',
				background: palette.background.light,
			}
		},
		'.emoji-mart-preview': {
			display: 'none',
		},
		'.emoji-mart-skin-swatches': {
			borderColor: 'rgba(66,66,66,.6)',
			background: palette.background.light,
		}
	}
}));


const EmojiPickerComp = ({ setMessage, setEmojiInfo }) => {
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = useState(null);

	const handleClick = evt => {
		evt = evt || window.event;
		setAnchorEl(evt.currentTarget);
	};

	const handleClose = () => {
		const textarea = document.getElementById('messagePanelInput');
		
		setAnchorEl(null);
		
		setTimeout(() => {
			textarea.focus();
			textarea.setSelectionRange(textarea.value.length, textarea.value.length);
		}, 200);
	};

	const open = Boolean(anchorEl);
	const id = open ? 'emoji-popover' : undefined;

	const addEmoji = (emoji) => {
		let inputVal = document.getElementById('messagePanelInput').value;
		const emojiObj = { id: emoji.id, native: emoji.native };
		inputVal += emoji.native;

		setMessage(inputVal);
		setEmojiInfo(arr => [...arr, emojiObj]);
	};

	return (
		<Fragment>
			<IconButton
				clicked={handleClick}
			>
				<EmojiIcon className={classes.icon} />
			</IconButton>
			<Popover
				className={classes.popover}
				classes={{
					paper: classes.popover
				}}
				id={id}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'center',
				}}
				transformOrigin={{
					vertical: 'bottom',
					horizontal: 'center',
				}}
				anchorPosition={{
					top: 50,
					left: 0
				}}
			>
				<NimblePicker onSelect={addEmoji} set='messenger' title='Pick your emoji…' data={data} />
			</Popover>
		</Fragment>
	);
};

export default EmojiPickerComp;
