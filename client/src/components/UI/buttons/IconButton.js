import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';

const useStyles = makeStyles(({ spacing, palette, shadows, breakpoints }) => ({
	fab: {
		margin: spacing(.5),
		background: palette.primary.dark,
		height: 36,
		width: 36,
		boxShadow: shadows[0],
		[breakpoints.down('xs')]: {
			margin: spacing(.4),
			height: 32,
			width: 32,
			minHeight: 32,
		}
	}

}));

const IconButton = (props) => {
	const classes = useStyles();

	return (
		<Fab className={classes.fab} color='primary'>
			{props.children}
		</Fab>
	);
}

export default IconButton;
