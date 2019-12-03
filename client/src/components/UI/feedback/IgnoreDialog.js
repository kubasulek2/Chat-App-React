import React, { forwardRef } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';


/* eslint-disable react/display-name */
const Transition = forwardRef(function Transition (props, ref) {
	return <Slide direction='up' ref={ref} {...props} />;
});

const IgnoreDialog = ({ open, handleOpen, dispatchChat, setIgnore, ignore }) => {

	const handleClose = () => {
		handleOpen(false);
	};

	const handleIgnore = () => {
		handleOpen(false);
		dispatchChat({ type: 'BLOCK', id: ignore.id, chatName: ignore.name });
		setIgnore(null);
	};


	return (
		<Dialog
			open={open}
			TransitionComponent={Transition}
			keepMounted
			onClose={handleClose}
		>
			<DialogTitle>Are you sure you want to block user <span className='styled'>{ignore.name}</span>?</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-slide-description">
					This user, won't be able to interact with you. This action is irreversible.
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} color="primary">
					cancel
				</Button>
				<Button onClick={handleIgnore} color="primary">
					proceed
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default IgnoreDialog;