import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddCircleIcon from '@material-ui/icons/AddCircle';



const useStyles = makeStyles(({ spacing }) => ({
	button: {
		marginBottom: spacing(1.5),
		paddingLeft: 24,
		paddingRight: 24,
	},

}));

const NewRoomButton = ({clicked}) => {
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
			onClick={clicked}
		>
			Add room
		</Button>
	);
};

export default NewRoomButton;
