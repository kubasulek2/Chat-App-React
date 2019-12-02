import React, { Fragment, useState, useEffect, useReducer } from 'react';
import Divider from '@material-ui/core/Divider';

import WithStyles from '../../hoc/withStyles';
import Sidebar from '../../components/layout/sidebar/Sidebar';
import ChatBoard from '../../components/layout/ChatBoard';
import Footer from '../../components/layout/Footer';
import Login from '../../components/UI/login/Login';
import ErrorModal from '../../components/UI/feedback/ErrorModal';
import InfoToast from '../../components/UI/feedback/InfoToast';
import ChatsPanel from '../../components/chat/ChatsPanel/ChatsPanel';
import { socket } from '../../server/socket';
import { chatActions } from '../../utils/actions';

const chatReducer = (chatObj, action) => {
	switch (action.type) {
		case 'JOIN':
			return chatActions.joinChat(chatObj, action.room);
		case 'SET_ACTIVE':
			return chatActions.setActive(chatObj, action.active);
		case 'MESSAGE':
			return chatActions.addMessage(chatObj, action.message);
		case 'PRIVATE':
			return chatActions.setPrivate(chatObj, action.id, action.userName);
		default:
			return chatObj;
	}
};



const App = () => {
	const [logged, setLogged] = useState(false);
	const [chat, dispatchChat] = useReducer(chatReducer, { activeChat: '', chats: {}, ignoredUsers: [], room: '' });
	const [myself, setMyself] = useState(null);

	const [rooms, setRooms] = useState([]);
	const [users, setUsers] = useState([]);

	const [pending, setPending] = useState(false);
	const [error, setError] = useState(false);
	const [toast, setToast] = useState({ open: false, message: null });


	useEffect(() => {

		socket.on('joinRoom', (user) => {
			dispatchChat({ type: 'JOIN', room: user.room });
			setLogged(true);
			setPending(false);
			setMyself(user);

			setTimeout(() => {
				setToast({
					open: true,
					message: <span>You have joined <span style={{ color: '#417cab', textTransform: 'uppercase', fontWeight: 'bold' }}>{user.room}</span> room.</span>
				});
			}, 400);
		});

		socket.on('roomsList', roomsList => {
			setRooms(roomsList);
		});

		socket.on('usersList', usersList => {
			setUsers(usersList);
		});

		socket.on('welcome', message => {
			dispatchChat({ type: 'MESSAGE', message: message });
		});

		socket.on('message', message => {

			if (message.privy) {
				const isUserIgnored = chat.ignoredUsers.some(id => id === message.userID);

				if (isUserIgnored) { return; }
			}
			dispatchChat({ type: 'MESSAGE', message: message });

		});

		socket.on('locationMessage', link => {

			if (link.privy) {
				const isUserIgnored = chat.ignoredUsers.some(id => id === link.userID);

				if (isUserIgnored) { return; }
			}

			dispatchChat({ type: 'MESSAGE', message: { ...link, location: true, text: <a key={link.text} rel='noopener noreferrer' target='_blank' href={link.text}>My location</a> } });

		});

		socket.on('privateChat', ({ userName, id }) => {

			if (!chat.ignoredUsers.includes(id) && !(id in chat.chats)) {
				dispatchChat({ type: 'PRIVATE', id, userName });
			}
		});


		return () => {
			socket.removeAllListeners();
		};
	}, [chat.ignoredUsers, chat.chats]);

	/* Clean unread flag if change chat selection */
	// s

	/* Filter messages */
	const activeMessages = () => chat.chats[chat.activeChat].messages || [];

	return (
		<Fragment>
			<ErrorModal error={error} handleOpen={setError} />
			{logged ?
				(
					<Fragment>
						<Sidebar
							myself={myself}
							rooms={rooms}
							users={users}
							setError={setError}
						/>
						<ChatBoard
							activeChat={chat.activeChat}
							messages={activeMessages()}
						/>
						<Divider />
						<ChatsPanel
							dispatchChat={dispatchChat}
							chat={chat}
						/>
						<Footer
							pending={pending}
							setPending={setPending}
							setError={setError}
							activeChat={chat.activeChat}
							room={chat.room}
						/>
						<InfoToast toast={toast} setToast={setToast} />
					</Fragment>
				) :
				<Login
					pending={pending}
					setPending={setPending}
					setLogged={setLogged}
				/>}
		</Fragment>
	);
};

export default WithStyles(App);
