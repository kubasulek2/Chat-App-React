import React, { Fragment, useContext } from 'react';
import Divider from '@material-ui/core/Divider';

import { AppStateContext } from '../containers/App';

// import Sidebar from '../components/layout/sidebar/Sidebar';
// import ChatBoard from './chat/ChatBoard';
// import Footer from '../components/layout/Footer';
// import Login from '../components/UI/login/Login';
import ErrorModal from '../components/UI/feedback/ErrorModal';
// import InfoToast from '../components/UI/feedback/InfoToast';
// import ChatsPanel from '../components/chat/ChatsPanel/ChatsPanel';


/* Container Component for all other components. */

const Chat = () => {

	const {logged} = useContext(AppStateContext);

	return (
		<Fragment>
			<ErrorModal />
			{/* {logged ?
				(
					<Fragment>
						<Sidebar />
						<ChatBoard />
						<Divider />
						<ChatsPanel />
						<Footer />
						<InfoToast />
					</Fragment>
				) :
				<Login />} */}
		</Fragment>
	);
};

export default Chat;
