import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Loader from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(() => ({
	root: {
		background: props => props.color,
		position: 'absolute',
		zIndex: 1000,
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	}
}));

const Spinner = (props) => {
	const classes = useStyles(props);

	return (
		<div className={classes.root}>
			<Loader color='primary' size={70} />
		</div>);
};

export default Spinner;
