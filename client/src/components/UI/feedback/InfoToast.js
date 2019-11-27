import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Snackbar from '@material-ui/core/Snackbar';

const useStyles = makeStyles(({spacing, palette}) => ({
	toast: {
		background: palette.background.paper,
		color: palette.text.primary
	},
	close: {
		padding: spacing(0.5),
		color: palette.text.secondary
	},
}));

const InfoToast = ({ toast, setToast}) => {
	const classes = useStyles();

	const handleClose = () => {
		setToast({open: false, message: null});
	};
	return (
		<Snackbar
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'center',
			}}
			open={toast.open}
			autoHideDuration={2500}
			onClose={handleClose}
			message={toast.message}
			ContentProps={{
				classes: {
					root: classes.toast
				}
			}}
			action={[
				<IconButton
					key="close"
					aria-label="close"
					color="inherit"
					className={classes.close}
					onClick={handleClose}
				>
					<CloseIcon />
				</IconButton>,
			]}
		/>
	);
};

export default InfoToast;
