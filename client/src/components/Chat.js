import React, { Fragment, useContext, useEffect } from 'react';
import Divider from '@material-ui/core/Divider';



import Sidebar from '../components/layout/sidebar/Sidebar';
import ChatBoard from './chat/ChatBoard';
import Footer from '../components/layout/Footer';


import InfoToast from '../components/UI/feedback/InfoToast';
import ChatsPanel from '../components/chat/ChatsPanel/ChatsPanel';




const Chat = () => {


	useEffect(() => {
		console.log('Chat');

	});
	return (
		<Fragment>



			<Fragment>
				<Sidebar />
				<ChatBoard />
				<Divider />
				<ChatsPanel />
				<Footer />
				<InfoToast />
			</Fragment>


		</Fragment>
	);
};

export default React.memo(Chat, (prev, next) => console.log(prev, next));
