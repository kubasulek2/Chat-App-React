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
import { showToast } from '../../utils/';

const chatReducer = (chatObj, action) => {
	switch (action.type) {
		case 'JOIN':
			return chatActions.joinRoom(chatObj, action.room);
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
			showToast(setToast, <span>You have joined <span className='styled'>{user.room}</span> room.</span>);

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
			console.log(message, message.privy);
			if (message.privy) {
				const isUserIgnored = chat.ignoredUsers.some(id => id === message.senderID);

				if (isUserIgnored) { return; }
			}
			dispatchChat({ type: 'MESSAGE', message: message });

		});

		socket.on('locationMessage', link => {

			if (link.privy) {
				const isUserIgnored = chat.ignoredUsers.some(id => id === link.senderID);

				if (isUserIgnored) { return; }
			}

			dispatchChat({ type: 'MESSAGE', message: { ...link, location: true, text: <a key={link.text} rel='noopener noreferrer' target='_blank' href={link.text}>My location</a> } });

		});

		socket.on('openPrivateChat', ({ requestedID, requestedName, requestingID, requestingName }) => {
			const chatExists = Object.keys(chat.chats).some(key => chat.chats[key].id === requestingID);

			if (chat.ignoredUsers.includes(requestingID)) {
				return socket.emit('rejectChat', { requestedName, requestingID });
			}

			if (!chatExists) {
				socket.emit('acceptChat', { requestedID, requestedName, requestingID });
				dispatchChat({ type: 'PRIVATE', requestingID, requestingName });
				showToast(setToast, <span>Private chat with <span className='styled'>{requestingName}</span></span>);
			}
		});

		socket.on('chatRejected', ({ requestedName }) => {
			
			setError({
				type: 403,
				message: <span><span style={{ color: '#417cab', textTransform: 'capitalize', fontWeight: 'bold' }}>{requestedName}</span> has blocked you.</span>
			});
		});

		socket.on('chatAccepted', ({ requestedName, requestedID }) => {
			
			dispatchChat({ type: 'PRIVATE', id: requestedID, userName: requestedName });
			dispatchChat({ type: 'SET_ACTIVE', active: requestedName});
			showToast(setToast, <span><span className='styled'>{requestedName}</span> accepted your request</span>);
		});

		return () => {
			socket.removeAllListeners();
		};
	}, [chat.ignoredUsers, chat.chats]);


	/* Filter messages */
	const activeMessages = () => chat.chats[chat.activeChat].messages || [];

	return (
		<Fragment>
			{error ? <ErrorModal error={error} handleOpen={setError} /> : null}
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
							chat={chat}
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
