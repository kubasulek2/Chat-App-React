import React, {Fragment, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';

import ColorizeIcon from '@material-ui/icons/Colorize';
import IconButton from './buttons/IconButton';

const useStyles = makeStyles(() => ({
	icon: {
		color: '#b0bec5'
	},
}));



const ColorPicker = () => {
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = useState(null);

	const handleClick = evt => {
		console.log('there');
		evt = evt || window.event;
		setAnchorEl(evt.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;
	
	return (
		<Fragment>
			<IconButton
				clicked={handleClick}
			>
				<ColorizeIcon className={classes.icon} />
			</IconButton>
			<Popover
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
				Blala
			</Popover>
		</Fragment>
	);
};

export default ColorPicker;
