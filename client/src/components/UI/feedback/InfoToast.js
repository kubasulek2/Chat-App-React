import React, { useContext } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Snackbar from '@material-ui/core/Snackbar';

import { DispatchContext, AppStateContext } from '../../../containers/App';

const useStyles = makeStyles(({ spacing, palette }) => ({
	root: {
		bottom: 65,
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

/* Component displays toast with chat notifications. */
const InfoToast = () => {
	const classes = useStyles();

	/* Use context. */
	const { toast } = useContext(AppStateContext);
	const { dispatchAppState } = useContext(DispatchContext);

	/* use media query */
	const matches = useMediaQuery('(min-width:960px)');

	/* Close toast */
	const handleClose = () => {
		dispatchAppState({ type: 'HIDE_TOAST' });
	};

	return (
		<Snackbar
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'left',
			}}
			className={classes.root}
			open={matches ? toast.open : false}
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
