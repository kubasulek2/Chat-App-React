import React, { useState, useCallback } from 'react';
import Grid from '@material-ui/core/Grid';

import { socket } from '../../server/socket';
import { getLocation } from '../../utils';
import PanelButtons from '../../components/UI/buttons/PanelButtons';
import MessageForm from '../../components/chat/MessageForm';
import BottomPanel from '../../components/chat/BottomPanel';


const MessagePanel = ({ pending, setPending, setError }) => {

	const [message, setMessage] = useState('');
	const [uppercaseMode, setUppercaseMode] = useState(false);


	const handleSubmit = useCallback((evt) => {
		evt = evt || window.event;
		
		evt.preventDefault();
		
		if (!message.length) return;

		setMessage('');

		socket.emit('sendMessage', message, error => {
			if (error) return setError(error);
		});
	}, [message, setError]);

	const handleLocation = async () => {
		try {
			const location = await getLocation();
			const { coords: { latitude, longitude } } = location;
			socket.emit('sendLocation', { latitude, longitude }, error => {
				if (error) setError(error);
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
				handleSubmit={handleSubmit}
				uppercaseMode={uppercaseMode}
				setUppercaseMode={setUppercaseMode}
			/>
			<Grid container justify='flex-end'>
				<BottomPanel
					setUppercaseMode={setUppercaseMode}
					uppercaseMode={uppercaseMode}
				/>
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