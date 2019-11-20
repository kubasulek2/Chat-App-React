import React, { Fragment, useState, useEffect } from 'react';
import Divider from '@material-ui/core/Divider';

import WithStyles from '../../hoc/withStyles';
import Sidebar from '../../components/layout/sidebar/Sidebar';
import ChatBoard from '../../components/layout/ChatBoard';
import Footer from '../../components/layout/Footer';
import Login from '../../components/UI/login/Login';
import { socket } from '../../server/socket';


const App = () => {

	const [ logged, setLogged ] = useState(false);
	const [ pending, setPending ] = useState(false);
	const [ messages, setMessages ] = useState([]);
	const [ error, setError ] = useState('');

	useEffect(() => {

		socket.on('locationMessage', link => {
			setMessages(messageArray => [
				...messageArray,
				{
					timestamp: link.timestamp,
					text: <a key={link.text} rel='noopener noreferrer' target='_blank' href={link.text}>My location</a>
				}
			]);
		});

		socket.on('message', message => {
			setMessages(messageArray => [ ...messageArray, message ]);
		});
		socket.on('welcome', message => {
			setMessages(messageArray => [ ...messageArray, message ]);
		});

		return () => socket.disconnect();
	}, []);

	return (
		logged ?
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
					/>
				</Fragment>
			) :
			<Login
				setLogged={setLogged}
			/>

	);
};

export default WithStyles(App);