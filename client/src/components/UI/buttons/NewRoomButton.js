import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CancelIcon from '@material-ui/icons/Cancel';
import AddCircleIcon from '@material-ui/icons/AddCircle';



const useStyles = makeStyles(({ spacing }) => ({
	button: {
		marginBottom: spacing(1.5),
		paddingLeft: 24,
		paddingRight: 24,
	},

}));

/* Button  for either canceling or accepting create new room*/
const NewRoomButton = ({clicked, text, dismiss}) => {
	const classes = useStyles();
	useEffect(() => console.log('NewRoomButton'));
	const icon =(
		dismiss
			? <CancelIcon color='secondary'/>
			: <AddCircleIcon color='secondary'/>
	);
	
	return (
		<Button
			variant="outlined"
			className={classes.button}
			endIcon={icon}
			size='large'
			onClick={clicked}
		>
			{text}
		</Button>
	);
};

export default NewRoomButton;