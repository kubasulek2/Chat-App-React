import React, { Fragment } from 'react';
import Divider from '@material-ui/core/Divider';

import Sidebar from '../components/layout/sidebar/Sidebar';
import ChatBoard from './chat/ChatBoard';
import Footer from '../components/layout/Footer';
import Login from '../components/UI/login/Login';
import ErrorModal from '../components/UI/feedback/ErrorModal';
import InfoToast from '../components/UI/feedback/InfoToast';
import ChatsPanel from '../components/chat/ChatsPanel/ChatsPanel';




const Chat = () => {

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

export default Chat;
