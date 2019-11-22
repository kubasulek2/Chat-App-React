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
	const [error, setError] = useState(false);

	useEffect(() => {

		socket.on('login', () => {
			setLogged(true);
			setPending(false);
		});

		socket.on('joinRoom', room => {
			console.log(room);
		});

		socket.on('roomsList', rooms => {
			console.log(rooms);
		});

		socket.on('usersList', users => {
			console.log(users);
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
						<Sidebar />
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
