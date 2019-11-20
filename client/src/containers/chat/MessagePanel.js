import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';

import { socket } from '../../server/socket';
import { getLocation } from '../../utils';
import PanelButtons from '../../components/UI/buttons/PanelButtons';
import MessageForm from '../../components/layout/MessageForm';



const MessagePanel = ({ pending, setPending }) => {
	
	const [ message, setMessage ] = useState('');


	const handleSubmit = (evt) => {
		evt.preventDefault();
		
		if(!message.length) return;
		
		setPending(true);
		setMessage('');

		socket.emit('sendMessage', message, error => {
			if (error) return console.log(error);
			setPending(false);
		});
	};

	const handleLocation = async () => {
		setPending(true);
		try {
			const location = await getLocation();
			const { coords: { latitude, longitude } } = location;
			socket.emit('sendLocation', { latitude, longitude }, () => {
				setTimeout(() => {
					setPending(false);

				}, 5000);
			});
		} catch (error) {
			// set error state to true
			console.log(error.message);
		}

	};

	return (
		<Grid container>
			<MessageForm
				message={message}
				setMessage={setMessage}
				pending={pending}
			/>
			<Grid container justify='flex-end'>
				<PanelButtons
					handleLocation={handleLocation}
					handleSubmit={handleSubmit}
					pending={pending}
				/>
			</Grid>
		</Grid>
	);
};

export default MessagePanel;