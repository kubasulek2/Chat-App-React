import React, { Fragment } from 'react';
import Divider from '@material-ui/core/Divider';



import Sidebar from '../components/layout/sidebar/Sidebar';
import ChatBoard from './chat/ChatBoard';
import Footer from '../components/layout/Footer';


import InfoToast from '../components/UI/feedback/InfoToast';
import ChatsPanel from '../components/chat/ChatsPanel/ChatsPanel';



/* Component displays all chat components. */
const Chat = () => {


	return (
		<Fragment>
			<Sidebar />
			<ChatBoard />
			<Divider />
			<ChatsPanel />
			<Footer />
			<InfoToast />
		</Fragment>
	);
};

export default Chat;
