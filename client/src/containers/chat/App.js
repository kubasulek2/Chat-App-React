import React, { Fragment, useState, useEffect } from 'react';
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


const App = () => {
	const [logged, setLogged] = useState(false);
	
	const [myself, setMyself] = useState(null);
	const [messages, setMessages] = useState([]);
	const [privateChats, setPrivateChats] = useState({});
	const [activeChat, setActiveChat] = useState('');
	const [ignoredIPs, setIgnoredIPs] = useState([]);
	const [mainUnread, setMainUnread] = useState(false);
	
	const [rooms, setRooms] = useState([]);
	const [users, setUsers] = useState([]);
	
	const [pending, setPending] = useState(false);
	const [error, setError] = useState(false);
	const [toast, setToast] = useState({ open: false, message: null });


	useEffect(() => {
		console.log('from App');
		socket.on('joinRoom', (user) => {
			setMessages([]);
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
			setMessages(messageArray => [...messageArray, message]);
		});

		socket.on('message', message => {
		
			if (message.mutual) {
				const isUserIgnored = ignoredIPs.find(ip => ip === message.userID);
				if (!isUserIgnored) {
					const privateChat = {...privateChats[message.userID], unread: true};
					privateChat.messages = [...privateChat.messages, message];
					
					setPrivateChats(chats => ({ ...chats, [message.userID]: privateChat }));
				}
			} else {
				setMessages(messageArray => [...messageArray, message]);
			}
		});

		socket.on('locationMessage', link => {
	
			setMessages(messageArray => [
				...messageArray,
				{
					timestamp: link.timestamp,
					text: <a key={link.text} rel='noopener noreferrer' target='_blank' href={link.text}>My location</a>,
					user: link.user,
					location: true
				}
			]);
		});

		socket.on('privateChat', ({ userName, id }) => {
		
			if (!ignoredIPs.includes(id) && !(id in privateChats)) {
				setPrivateChats(chats => ({ ...chats, [id]: { userName, messages: [] } }));
			}
		});


		return () => {
			socket.removeAllListeners();
		};
	}, [privateChats,ignoredIPs]);

	/* Clean unread flag if change chat selection */
	useEffect(() => {
		if (activeChat){
			return setPrivateChats(chats => ({...chats, [activeChat]: {...chats[activeChat], unread: false}}));
		}

	}, [activeChat]);

	const activeMessages = () => {
		console.log(activeChat);
		if(activeChat){
			console.log('here');
			return privateChats[activeChat].messages;
		}	
		return messages;
	};

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
							activeChat={activeChat}
							messages={activeMessages()}
						/>
						<Divider />
						<ChatsPanel
							setActiveChat={setActiveChat}
							privateChats={privateChats}
							myself={myself}
						/>
						<Footer
							pending={pending}
							setPending={setPending}
							setError={setError}
							activeChat={activeChat}
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
