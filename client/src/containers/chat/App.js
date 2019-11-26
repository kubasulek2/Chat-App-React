import React, { Fragment, useState, useEffect } from 'react';
import Divider from '@material-ui/core/Divider';

import WithStyles from '../../hoc/withStyles';
import Sidebar from '../../components/layout/sidebar/Sidebar';
import ChatBoard from '../../components/layout/ChatBoard';
import Footer from '../../components/layout/Footer';
import Login from '../../components/UI/login/Login';
import ErrorModal from '../../components/UI/ErrorModal';
import { socket } from '../../server/socket';

// const privatePattern = /^__private__/;
// if (privatePattern.test(room)) return { error: 'This name is restricted.' };

const App = () => {

	const [logged, setLogged] = useState(false);
	const [pending, setPending] = useState(false);
	const [messages, setMessages] = useState([]);
	const [rooms, setRooms] = useState([]);
	const [users, setUsers] = useState([]);
	const [myself, setMyself] = useState(null);
	const [error, setError] = useState(false);

	useEffect(() => {
		console.log('here');
		socket.on('login', (user) => {
			setLogged(true);
			setPending(false);
			setMyself(user);
		});

		socket.on('joinRoom', room => {
			console.log(room);
		});

		socket.on('roomsList', roomsList => {
			console.log(roomsList);
			setRooms(roomsList);
		});

		socket.on('usersList', usersList => {
			console.log('here');
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
						/>
						<ChatBoard
							messages={messages}
						/>
						<Divider />
						<Footer
							pending={pending}
							setPending={setPending}
							setError={setError}
						/>
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
