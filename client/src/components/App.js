import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import WithStyles from '../hoc/withStyles';


const useStyles = makeStyles(({ palette }) => ({
	app: {
		color: palette.primary.main
	}
}));

const App = () => {
	const classes = useStyles();
	return (
		<div className={classes.app}>
			App
		</div>
	);
};

export default WithStyles(App);
