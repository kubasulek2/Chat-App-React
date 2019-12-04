import React, { useState, useCallback, useContext } from 'react';
import Grid from '@material-ui/core/Grid';

import { DispatchContext, ChatContext } from '../../containers/App';
import { socket } from '../../server/socket';
import { getLocation } from '../../utils';
import PanelButtons from '../../components/UI/buttons/PanelButtons';
import MessageForm from '../../components/chat/MessageForm';
import BottomPanel from '../../components/chat/BottomPanel';

/* Stateful Component that contains all message related components */
const MessagePanel = () => {

	/* Local state for handling sending message */
	const [message, setMessage] = useState('');
	const [emojiInfo, setEmojiInfo] = useState([]);
	const [uppercaseMode, setUppercaseMode] = useState(false);
	const [color, setColor] = useState('#b0bec5');

	/* Use context */
	const { dispatchAppState } = useContext(DispatchContext);
	const { activeChat, chats, room } = useContext(ChatContext);

	/* determine if message is private */
	const privy = activeChat !== room;

	/* socket identifier for passing message on server */
	const sendTo = chats[activeChat].id;

	/* Submit handler, useCallback because it is passed to another component */
	const handleSubmit = useCallback((evt) => {
		evt.preventDefault();

		/* Prevent sending empty messages */
		if (!message.length) {
			return;
		}

		/* Send message to a server */
		socket.emit('sendMessage', { message, emojiInfo, color, sendTo, privy }, error => {
			if (error) {
				/* Handle error message from server. */
				return dispatchAppState({ type: 'SET_ERROR', message: error.message, errType: error.type });
			}
		});

		setMessage('');
		setEmojiInfo([]);

	}, [message, dispatchAppState, emojiInfo, color, privy, sendTo]);


	/* Location message handler, useCallback because it is passed to another component */
	const handleLocation = useCallback(async () => {
		try {
			/* Await getLocation return promise. */
			const location = await getLocation();
			const { coords: { latitude, longitude } } = location;

			/* Send location to server */
			socket.emit('sendLocation', { latitude, longitude, sendTo, privy }, error => {
				/* Handle server error message. */
				if (error) dispatchAppState({ type: 'SET_ERROR', message: error.message, errType: error.type });
			});
		} catch (error) {
			/* Handle Geolocation errors. */
			dispatchAppState({ type: 'SET_ERROR', message: error.message, errType: 'Geolocation Error' });
		}

	}, [privy, sendTo, dispatchAppState]);

	return (
		<Grid container>
			<MessageForm
				message={message}
				setMessage={setMessage}
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
				/>
			</Grid>
		</Grid>
	);
};

export default MessagePanel;