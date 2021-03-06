import chatActions from '../actions/chatActions';

/**
 * @requires chatActions - Helper functions for handling state.
 */

/* Chat reducer */
const chatReducer = (chatObj, action) => {
	switch (action.type) {
		case 'JOIN':
			return chatActions.joinRoom(chatObj, action.room, action.userName);
		case 'SET_ACTIVE':
			return chatActions.setActive(chatObj, action.active);
		case 'MESSAGE':
			return chatActions.addMessage(chatObj, action.message);
		case 'PRIVATE':
			return chatActions.setPrivate(chatObj, action.id, action.userName);
		case 'CLOSE':
			return chatActions.close(chatObj, action.chatName);
		case 'BLOCK':
			return chatActions.block(chatObj, action.id, action.chatName);
		default:
			return chatObj;
	}
};

export default chatReducer;