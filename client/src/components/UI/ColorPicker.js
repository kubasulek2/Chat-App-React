import React, { Fragment, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';

import ColorizeIcon from '@material-ui/icons/Colorize';
import IconButton from './buttons/IconButton';

const useStyles = makeStyles(({ spacing, palette }) => ({
	icon: {
		color: props => props.color
	},
	popover: {
		padding: spacing(1.5),
		paddingBottom: spacing(2),
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'center',
		width: 170
	},
	color: {
		cursor: 'pointer',
		margin: spacing(.6),
		width: 25,
		height: 25,
		border: '1px solid ' + palette.grey[500],
		borderRadius: 4,
	}
}));



const ColorPicker = (props) => {
	const classes = useStyles(props);
	const { setColor } = props;
	const [anchorEl, setAnchorEl] = useState(null);

	const handleClick = evt => {
		evt = evt || window.event;
		setAnchorEl(evt.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? 'color-popover' : undefined;

	const handleColorChange = (evt) => {
		evt = evt || window.evt;
		setColor(evt.target.style.background);
		setAnchorEl(null);
	};

	return (
		<Fragment>
			<IconButton
				clicked={handleClick}
			>
				<ColorizeIcon className={classes.icon} />
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
				<div className={classes.color} onClick={handleColorChange} style={{ background: '#b0bec5' }}></div>
				<div className={classes.color} onClick={handleColorChange} style={{ background: '#f44336' }}></div>
				<div className={classes.color} onClick={handleColorChange} style={{ background: '#ff9800' }}></div>
				<div className={classes.color} onClick={handleColorChange} style={{ background: '#ffeb3b' }}></div>
				<div className={classes.color} onClick={handleColorChange} style={{ background: '#ab47bc' }}></div>
				<div className={classes.color} onClick={handleColorChange} style={{ background: '#03a9f4' }}></div>
				<div className={classes.color} onClick={handleColorChange} style={{ background: '#00bcd4' }}></div>
				<div className={classes.color} onClick={handleColorChange} style={{ background: '#00c853' }}></div>
				<div className={classes.color} onClick={handleColorChange} style={{ background: '#1de9b6' }}></div>
				<div className={classes.color} onClick={handleColorChange} style={{ background: '#c6ff00' }}></div>
				<div className={classes.color} onClick={handleColorChange} style={{ background: '#795548' }}></div>
				<div className={classes.color} onClick={handleColorChange} style={{ background: '#fff' }}></div>
			</Popover>
		</Fragment>
	);
};

export default ColorPicker;
