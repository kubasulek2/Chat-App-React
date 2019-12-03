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
import chatReducer from '../../utils/reducers/chatReducer';
import usersReducer from '../../utils/reducers/usersReducer';
import stateReducer from '../../utils/reducers/stateReducer';
import { socket } from '../../server/socket';
import { showToast } from '../../utils';




const App = () => {
	const [chat, dispatchChat] = useReducer(chatReducer, { activeChat: '', chats: {}, ignoredUsers: [], room: '' });
	//const [users, dispatchUsers] = useReducer(usersReducer, { myself: {}, rooms: [], users: [] })
	const [appState, dispatchAppState] = useReducer(stateReducer, { logged: false, pending: false, error: false, toast: { open: false, message: null } });

	const [myself, setMyself] = useState({});
	const [rooms, setRooms] = useState([]);
	const [users, setUsers] = useState([]);

	//const [logged, setLogged] = useState(false);
	// const [pending, setPending] = useState(false);
	// const [error, setError] = useState(false);
	// const [toast, setToast] = useState({ open: false, message: null });

	const { ignoredUsers, chats, activeChat, room } = chat;
	const { error, pending, logged, toast } = appState; 


	useEffect(() => {

		socket.on('joinRoom', (user) => {
			dispatchChat({ type: 'JOIN', room: user.room });
			dispatchAppState({ type: 'JOIN', myself: user });
			setMyself(user);

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
				const isUserIgnored = ignoredUsers.some(id => id === message.senderID);

				if (isUserIgnored) {
					return socket.emit('rejectChat', { requestedName: myself.userName, requestingID: message.senderID });
				}
			}
			dispatchChat({ type: 'MESSAGE', message: message });

		});


		socket.on('locationMessage', link => {

			if (link.privy) {
				const isUserIgnored = ignoredUsers.some(id => id === link.senderID);

				if (isUserIgnored) {
					return socket.emit('rejectChat', { requestedName: myself.userName, requestingID: link.senderID });
				}
			}

			dispatchChat({ type: 'MESSAGE', message: { ...link, location: true, text: <a key={link.text} rel='noopener noreferrer' target='_blank' href={link.text}>My location</a> } });

		});


		socket.on('openPrivateChat', ({ requestedID, requestedName, requestingID, requestingName }) => {
			const chatExists = Object.keys(chats).some(key => chats[key].id === requestingID);

			if (ignoredUsers.includes(requestingID)) {
				return socket.emit('rejectChat', { requestedName, requestingID });
			}

			if (!chatExists) {
				dispatchChat({ type: 'PRIVATE', id: requestingID, userName: requestingName });
				showToast(dispatchAppState, <span>Private chat with <span className='styled'>{requestingName}</span></span>);
			}
			socket.emit('acceptChat', { requestedID, requestedName, requestingID });
		});


		socket.on('chatRejected', ({ requestedName }) => {

			dispatchAppState({
				type: 'SET_ERROR',
				errType: 403,
				message: <span><span style={{ color: '#417cab', textTransform: 'capitalize', fontWeight: 'bold' }}>{requestedName}</span> has blocked you.</span>
			});
		});


		socket.on('chatAccepted', ({ requestedName, requestedID }) => {

			dispatchChat({ type: 'PRIVATE', id: requestedID, userName: requestedName });
			dispatchChat({ type: 'SET_ACTIVE', active: requestedName });
		});


		socket.on('connect_error', () => {
			dispatchAppState({
				type: 'SET_ERROR',
				errType: 'Connection failed',
				message: 'Either you have no connection or server not responding'
			});
		});


		socket.on('connect_timeout', () => {
			dispatchAppState({
				type: 'SET_ERROR',
				errType: 408,
				message: 'Request Timeout.'
			});
		});


		return () => socket.removeAllListeners();

	}, [ignoredUsers, chats, myself.userName]);

	useEffect(() => {
		if (activeChat) {
			showToast(dispatchAppState, <span><span className='styled'>{activeChat}</span> is your active chat now.</span>);
		}
	}, [activeChat]);


	/* Filter messages */
	const activeMessages = () => chats[activeChat].messages || [];

	return (
		<Fragment>
			<ErrorModal error={error} dispatchAppState={dispatchAppState} />
			{logged ?
				(
					<Fragment>
						<Sidebar
							myself={myself}
							rooms={rooms}
							users={users}
							dispatchAppState={dispatchAppState}
							ignoredUsers={ignoredUsers}
						/>
						<ChatBoard
							activeChat={activeChat}
							messages={activeMessages()}
						/>
						<Divider />
						<ChatsPanel
							dispatchChat={dispatchChat}
							chats={chats}
							room={room}
							activeChat={activeChat}
						/>
						<Footer
							pending={pending}
							dispatchAppState={dispatchAppState}
							chats={chats}
							room={room}
							activeChat={activeChat}
						/>
						<InfoToast toast={toast} dispatchAppState={dispatchAppState} />
					</Fragment>
				) :
				<Login
					pending={pending}
					dispatchAppState={dispatchAppState}
				/>}
		</Fragment>
	);
};

export default WithStyles(App);
