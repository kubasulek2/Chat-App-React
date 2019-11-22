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
	const [color, setColor] = useState('#b0bec5');



	const handleSubmit = useCallback((evt) => {
		evt = evt || window.event;
		evt.preventDefault();
		
		if (!message.length) return;
		setPending(true);

		setMessage('');

		socket.emit('sendMessage', message, error => {
			if (error) return setError(error);
		});
	}, [message, setError]);

	const handleLocation = async () => {
		try {
			setPending(true);
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
				color={color}
			/>
			<Grid container justify='flex-end'>
				<BottomPanel
					setMe
					color={color}
					setColor={setColor}
					setUppercaseMode={setUppercaseMode}
					uppercaseMode={uppercaseMode}
					setMessage={setMessage}
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