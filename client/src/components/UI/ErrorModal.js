import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles(theme => ({
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		border: '1px solid rgba(66,66,66, 0.4)',
		outline: 'none',
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		border: '1px solid rgba(66,66,66, 0.4)',
		outline: 'none',
		boxShadow: theme.shadows[ 2 ],
		padding: theme.spacing(2, 4, 3),
	},
}));

const ErrorModal = ({ error, handleOpen }) => {
	const classes = useStyles();

	const handleClose = () => {
		handleOpen(false);
	};
	const open = !!error;

	return (
		<Modal
			className={classes.modal}
			open={open}
			onClose={handleClose}
			closeAfterTransition
			BackdropComponent={Backdrop}
			BackdropProps={{
				timeout: 500,
			}}
		>
			<Fade in={open}>
				<div className={classes.paper}>
					<h2>{error}</h2>
				</div>
			</Fade>
		</Modal>

	);
};

export default ErrorModal;