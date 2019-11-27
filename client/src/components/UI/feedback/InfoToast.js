import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Snackbar from '@material-ui/core/Snackbar';

const useStyles = makeStyles(({spacing, palette}) => ({
	root: {
		bottom: 10,
		left: 10
	},
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
	const matches = useMediaQuery('(min-width:960px)');

	const handleClose = () => {
		setToast({open: false, message: null});
	};
	return (
		<Snackbar
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'left',
			}}
			className={classes.root}
			open={ matches ? toast.open : false}
			autoHideDuration={2500}
			onClose={handleClose}
			message={toast.message}
			ContentProps={{
				classes: {
					root: classes.toast,
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
