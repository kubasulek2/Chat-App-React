import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import LocationOnIcon from '@material-ui/icons/LocationOn';

import { AppStateContext } from '../../../containers/App';

const useStyles = makeStyles(({ palette, breakpoints }) => ({
	sendButton: {
		fontWeight: 'bold',
		color: palette.text.primary,
		paddingLeft: 30,
		paddingRight: 30,
		[breakpoints.down('xs')]: {
			paddingLeft: 23,
			paddingRight: 23,
		}
	},
	locationButton: {
		color: palette.text.primary,
	},
}));

/* Component displays  submit message and send location buttons. */
const PanelButtons = ({ handleLocation, handleSubmit }) => {
	const classes = useStyles();
	
	/* Use Context. */
	const { pending } = useContext(AppStateContext);

	return (
		<ButtonGroup
			size='large'
			className={classes.buttonGroup}
		>
			<Button
				form={'message-form'}
				type='submit'
				color='secondary'
				variant='contained'
				className={classes.sendButton}
				onClick={handleSubmit}
				disabled={pending}
			> send
			</Button>
			<Button
				className={classes.locationButton}
				size='small'
				variant='contained'
				color='secondary'
				onClick={handleLocation}
				disabled={pending}
			>
				<LocationOnIcon />
			</Button>
		</ButtonGroup>
	);
};

export default React.memo(PanelButtons);

