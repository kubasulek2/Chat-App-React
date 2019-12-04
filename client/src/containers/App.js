import React, { useEffect, useReducer, createContext, useMemo } from 'react';

import WithStyles from '../hoc/withStyles';

import chatReducer from '../utils/reducers/chatReducer';
import chatInfoReducer from '../utils/reducers/chatInfoReducer';
import stateReducer from '../utils/reducers/stateReducer';

import { socket } from '../server/socket';
import { showToast } from '../utils';

/* Root Component that provides state reducers and Context.Providers for its children. */

/* React Context Api */
export const DispatchContext = createContext();
export const ChatContext = createContext();
export const ChatInfoContext = createContext();
export const AppStateContext = createContext();

/* Root Component handling state and providing context. */
const App = ({ children }) => {

	/* State reducers. */
	const [chat, dispatchChat] = useReducer(chatReducer, { activeChat: '', chats: {}, ignoredUsers: [], room: ';' });
	const [chatInfo, dispatchChatInfo] = useReducer(chatInfoReducer, { myself: {}, rooms: [], users: [] });
	const [appState, dispatchAppState] = useReducer(stateReducer, { logged: false, pending: false, error: false, toast: { open: false, message: null } });

	/* Reducers destructuring for Context.Providers value object and useEffects dependency arrays */
	const { ignoredUsers, chats, activeChat, room } = chat;
	const { myself, rooms, users } = chatInfo;
	const { logged, pending, error, toast } = appState;

	/* Context.Providers values destructured and memoised */
	const dispatchValue = { dispatchChat, dispatchChatInfo, dispatchAppState };
	const chatValue = useMemo(() => ({ ignoredUsers, chats, activeChat, room }), [ignoredUsers, chats, activeChat, room]);
	const chatInfoValue = useMemo(() => ({ myself, rooms, users }), [myself, rooms, users]);
	const appStateValue = useMemo(() => ({ logged, pending, error, toast }), [logged, pending, error, toast]);



	/* All the socket events logic. */
	useEffect(() => {

		/* On login or switching room */
		socket.on('joinRoom', (user) => {
			dispatchChat({ type: 'JOIN', room: user.room });
			dispatchAppState({ type: 'JOIN', myself: user });
			dispatchChatInfo({ type: 'SET_MYSELF', myself: user });

		});

		/* Server sending existing rooms list. */
		socket.on('roomsList', roomsList => {
			dispatchChatInfo({ type: 'SET_ROOMS', rooms: roomsList });
		});

		/* Server sending users in room. */
		socket.on('usersList', usersList => {
			dispatchChatInfo({ type: 'SET_USERS', users: usersList });
		});

		/* Server sending welcome message after joining a room */
		socket.on('welcome', message => {
			dispatchChat({ type: 'MESSAGE', message: message });
		});

		/* Handle displaying messages */
		socket.on('message', message => {

			/* When message is private detect if sender isn't blocked.*/
			if (message.privy) {
				const isUserIgnored = ignoredUsers.some(id => id === message.senderID);

				if (isUserIgnored) {
					/* If sender is blocked emit reject event to notify him, he's been blocked by you*/
					return socket.emit('rejectChat', { requestedName: myself.userName, requestingID: message.senderID });
				}
			}
			dispatchChat({ type: 'MESSAGE', message: message });

		});

		/* Another type of message with location link. */
		socket.on('locationMessage', link => {

			/* Validation when message is private. */
			if (link.privy) {
				const isUserIgnored = ignoredUsers.some(id => id === link.senderID);

				if (isUserIgnored) {
					return socket.emit('rejectChat', { requestedName: myself.userName, requestingID: link.senderID });
				}
			}

			dispatchChat({ type: 'MESSAGE', message: { ...link, location: true, text: <a key={link.text} rel='noopener noreferrer' target='_blank' href={link.text}>My location</a> } });

		});

		/* Event fires when someone tries to enter private chat with you. */
		socket.on('openPrivateChat', ({ requestedID, requestedName, requestingID, requestingName }) => {
			const chatExists = Object.keys(chats).some(key => chats[key].id === requestingID);

			/* Notify sender if is blocked by you. */
			if (ignoredUsers.includes(requestingID)) {
				return socket.emit('rejectChat', { requestedName, requestingID });
			}
			/* Create new private chat state if there isn't one already. */
			if (!chatExists) {
				dispatchChat({ type: 'PRIVATE', id: requestingID, userName: requestingName });
				showToast(dispatchAppState, <span>Private chat with <span className='styled'>{requestingName}</span></span>);
			}
			/* Accept chat */
			socket.emit('acceptChat', { requestedID, requestedName, requestingID });
		});

		/* Display ErrorModal with information about being blocked by user. */
		socket.on('chatRejected', ({ requestedName }) => {

			dispatchAppState({
				type: 'SET_ERROR',
				errType: 403,
				message: <span><span style={{ color: '#417cab', textTransform: 'capitalize', fontWeight: 'bold' }}>{requestedName}</span> has blocked you.</span>
			});
		});

		/* When private chat is accepted by requested user create new chat and switch to it. */
		socket.on('chatAccepted', ({ requestedName, requestedID }) => {

			dispatchChat({ type: 'PRIVATE', id: requestedID, userName: requestedName });
			dispatchChat({ type: 'SET_ACTIVE', active: requestedName });
		});

		/* Handle Server and Connection errors. */
		socket.on('connect_error', () => {
			dispatchAppState({
				type: 'SET_ERROR',
				errType: 'Connection failed',
				message: 'Either you have no connection or server not responding'
			});
		});

		/* Handle connection's timeout. */
		socket.on('connect_timeout', () => {
			dispatchAppState({
				type: 'SET_ERROR',
				errType: 408,
				message: 'Request Timeout.'
			});
		});

		/* Clearing all listeners before next function call, for them not to fire multiple times */
		return () => socket.removeAllListeners();

	}, [ignoredUsers, chats, myself.userName]);

	/* Show info Toast when activeChat is changed. */
	useEffect(() => {
		if (activeChat) {
			showToast(dispatchAppState, <span><span className='styled'>{activeChat}</span> is your active chat now.</span>);
		}
	}, [activeChat]);




	return (
		<DispatchContext.Provider value={dispatchValue}>
			<ChatContext.Provider value={chatValue}>
				<ChatInfoContext.Provider value={chatInfoValue}>
					<AppStateContext.Provider value={appStateValue}>
						{children}
					</AppStateContext.Provider>
				</ChatInfoContext.Provider>
			</ChatContext.Provider>
		</DispatchContext.Provider>

	);
};

export default WithStyles(App);
