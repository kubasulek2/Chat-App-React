import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


const useStyles = makeStyles(({ transitions }) => ({
	card: {
		maxWidth: 345,
		minWidth: 345,
		position: 'absolute',
		bottom: 0,
		right: 10
	},
	expand: {
		transform: 'rotate(180deg)',
		marginLeft: 'auto',
		transition: transitions.create('transform', {
			duration: transitions.duration.shortest
		})
	},
	expandOpen: {
		transform: 'rotate(0deg)'
	}
}));


const ChatList = ({ privateChats }) => {
	const classes = useStyles();
	const [expanded, setExpanded] = useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	return (
		privateChats.length
			? <Card className={classes.card}>
				<Collapse in={expanded} timeout='auto' unmountOnExit>
					<CardContent>
						<Typography paragraph>Method:</Typography>
						<Typography paragraph>
							Heat 1/2 cup of the broth in a pot until simmering, add saffron and
							set aside for 10 minutes.
          			</Typography>
					</CardContent>
				</Collapse>
				<CardActions disableSpacing>
					<IconButton
						className={expanded ? classes.expand : classes.expandOpen}
						onClick={handleExpandClick}
						aria-expanded={expanded}
					>
						<ExpandMoreIcon />
					</IconButton>
				</CardActions>
			</Card>
			: null
	);
};

export default ChatList;
