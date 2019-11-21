import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';

import { socket } from '../../server/socket';
import { getLocation } from '../../utils';
import PanelButtons from '../../components/UI/buttons/PanelButtons';
import MessageForm from '../../components/chat/MessageForm';
import BottomPanel from '../../components/chat/BottomPanel';


const MessagePanel = ({ pending, setPending, setError }) => {

	const [ message, setMessage ] = useState('');


	const handleSubmit = (evt) => {
		evt.preventDefault();

		if (!message.length) return;

		setPending(true);
		setMessage('');

		socket.emit('sendMessage', message, error => {
			setPending(false);
			if (error) return setError(error);
		});
	};

	const handleLocation = async () => {
		setPending(true);
		try {
			const location = await getLocation();
			const { coords: { latitude, longitude } } = location;
			socket.emit('sendLocation', { latitude, longitude }, error => {
				if (error) setError(error);
				setPending(false);
			});
		} catch (error) {
			setPending(false);
			setError(error.message);
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
				<BottomPanel />
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