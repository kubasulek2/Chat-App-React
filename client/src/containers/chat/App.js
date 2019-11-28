import React, { Fragment, useState, useEffect } from 'react';
import Divider from '@material-ui/core/Divider';

import WithStyles from '../../hoc/withStyles';
import Sidebar from '../../components/layout/sidebar/Sidebar';
import ChatBoard from '../../components/layout/ChatBoard';
import Footer from '../../components/layout/Footer';
import Login from '../../components/UI/login/Login';
import ErrorModal from '../../components/UI/feedback/ErrorModal';
import InfoToast from '../../components/UI/feedback/InfoToast';
import { socket } from '../../server/socket';

const App = () => {

	const [logged, setLogged] = useState(false);
	const [pending, setPending] = useState(false);
	const [messages, setMessages] = useState([]);
	const [rooms, setRooms] = useState([]);
	const [users, setUsers] = useState([]);
	const [myself, setMyself] = useState(null);
	const [error, setError] = useState(false);
	const [toast, setToast] = useState({ open: false, message: null });
	const [privateChats, setPrivateChats] = useState([]);



	useEffect(() => {
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

			setMessages(messageArray => [...messageArray, message]);
		});

		socket.on('locationMessage', link => {

			setMessages(messageArray => [
				...messageArray,
				{
					timestamp: link.timestamp,
					text: <a key={link.text} rel='noopener noreferrer' target='_blank' href={link.text}>My location</a>,
					user: link.user
				}
			]);
		});

		socket.on('privateChat', ({ userName, id }) => {
			setPrivateChats({ userName, id, messages: [], ignored: false });
		});


		return () => socket.disconnect();
	}, []);


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
							messages={messages}
						/>
						<Divider />
						<Footer
							privateChats={privateChats}
							pending={pending}
							setPending={setPending}
							setError={setError}
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
