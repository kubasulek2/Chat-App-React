import React, { forwardRef, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

import { AppStateContext, DispatchContext } from '../../../containers/App';

const useStyles = makeStyles(({ palette, shadows }) => ({
	paper: {
		minWidth: 300,
		maxWidth: '98%',
		backgroundColor: palette.background.paper,
		border: '1px solid rgba(66,66,66, 0.4)',
		boxShadow: shadows[2],
	},
	bold: {
		fontWeight: 'bold',
		color: palette.primary.main
	},
	error: {
		color: palette.error.dark
	}
}));


/* eslint-disable react/display-name */

/* Create Transition component with ref forwarded. */
const Transition = forwardRef(function Transition (props, ref) {
	return <Slide direction='up' ref={ref} unmountOnExit {...props} />;
});
/* eslint-enable react/display-name */


/* Modal showing up when error state is set to true.  */
const ErrorModal = () => {
	const classes = useStyles();

	const { error } = useContext(AppStateContext);
	const { dispatchAppState } = useContext(DispatchContext);

	/* Handle cancel error and close modal. */
	const handleClose = () => {
		dispatchAppState({ type: 'CANCEL_ERROR' });
	};

	const open = !!error;

	return (
		<Dialog
			className={classes.root}
			TransitionComponent={Transition}
			open={open}
			onClose={handleClose}
			closeAfterTransition
			PaperProps={{
				classes: {
					root: classes.paper
				}
			}}
		>
			<DialogTitle><span className={classes.bold}>Ups!</span> Error: <span className={classes.error}>{error.type}</span></DialogTitle>
			<DialogContent>
				<DialogContentText >
					{error.message}
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} color="primary">
					Ok
				</Button>
			</DialogActions>
		</Dialog>

	);
};

export default ErrorModal;

