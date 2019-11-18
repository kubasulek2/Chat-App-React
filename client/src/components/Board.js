import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(({breakpoints, spacing}) => ({
	root: {
		flexGrow: 1,
		marginLeft: 300,
		[ breakpoints.down('md') ]: {
			marginLeft: 0
		},
		padding: spacing(2)
	}
}));

const Board = () => {
	const classes = useStyles();
	return (
		<Grid container className={classes.root}>
			<form>
				<input type="text" name="message" id="" />
				<button>send</button>
			</form>
		</Grid>
	);
};

export default Board;
