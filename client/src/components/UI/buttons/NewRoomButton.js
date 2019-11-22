import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddCircleIcon from '@material-ui/icons/AddCircle';



const useStyles = makeStyles(({ spacing }) => ({
	button: {
		margin: spacing(1.5),
	},

}));

const NewRoomButton = () => {
	const classes = useStyles();
	return (
		<Button
			variant="outlined"
			className={classes.button}
			endIcon={
				<AddCircleIcon
					color='secondary'
				/>
			}
			size='large'
		>
			Add room
		</Button>
	);
};

export default NewRoomButton;
