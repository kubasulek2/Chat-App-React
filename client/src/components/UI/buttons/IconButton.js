import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';

const useStyles = makeStyles(({ spacing, palette, shadows }) => ({
	fab: {
		margin: spacing(.5),
		background: palette.primary.dark,
		height: 36,
		width: 36,
		boxShadow: shadows[0]
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
