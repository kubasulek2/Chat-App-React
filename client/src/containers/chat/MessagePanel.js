import React, { useState, useCallback } from 'react';
import Grid from '@material-ui/core/Grid';

import { socket } from '../../server/socket';
import { getLocation } from '../../utils';
import PanelButtons from '../../components/UI/buttons/PanelButtons';
import MessageForm from '../../components/chat/MessageForm';
import BottomPanel from '../../components/chat/BottomPanel';


const MessagePanel = ({ pending, dispatchAppState, activeChat, room, chats }) => {

	const [message, setMessage] = useState('');
	const [emojiInfo, setEmojiInfo] = useState([]);
	const [uppercaseMode, setUppercaseMode] = useState(false);
	const [color, setColor] = useState('#b0bec5');

	const privy = activeChat !== room;
	const sendTo = chats[activeChat].id;

	const handleSubmit = useCallback((evt) => {
		evt.preventDefault();

		if (!message.length) {
			return;
		}

		socket.emit('sendMessage', { message, emojiInfo, color, sendTo, privy }, error => {
			if (error) {
				return dispatchAppState({ type: 'SET_ERROR', message: error.message, errType: error.type });
			}
		});

		setMessage('');
		setEmojiInfo([]);

	}, [message, dispatchAppState, emojiInfo, color, privy, sendTo]);

	const handleLocation = useCallback(async () => {
		try {
			const location = await getLocation();
			const { coords: { latitude, longitude } } = location;
			socket.emit('sendLocation', { latitude, longitude, sendTo, privy }, error => {
				if (error) dispatchAppState({ type: 'SET_ERROR', message: error.message, errType: error.type });
			});
		} catch (error) {
			dispatchAppState({ type: 'SET_ERROR', message: error.message, errType: 'Geolocation Error' });
		}

	}, [privy, sendTo, dispatchAppState]);

	return (
		<Grid container>
			<MessageForm
				activeChat={activeChat}
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
					setEmojiInfo={setEmojiInfo}
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