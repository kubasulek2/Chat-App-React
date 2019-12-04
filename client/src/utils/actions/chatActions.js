import produce from 'immer';
/**
 * @module produce - Module from `immer` npm package for immutable state updates.
 */

/** @requires {module} produce - All functions below. */


/* functions handling state updates in chat reducer.*/

const joinRoom = (chat, room) => produce(chat, draft => {
	delete draft.chats[chat.room];
	draft.chats[room] = { id: room, messages: [], unread: false };
	draft.activeChat = room;
	draft.room = room;
});


const setActive = (chat, active) => produce(chat, draft => {
	draft.chats[active].unread = false;
	draft.activeChat = active;
});


const addMessage = (chat, message) => {
	const channel = message.privy ? message.sender : chat.room;

	return produce(chat, draft => {
		draft.chats[channel].messages = draft.chats[channel].messages || [];
		draft.chats[channel].messages.push(message);
		draft.chats[channel].unread = channel !== chat.activeChat;
	});
};

const setPrivate = (chat, id, userName) => produce(chat, draft => {
	draft.chats[userName] = { id, messages: [] };
});


const block = (chat, id, name) => {
	return produce(chat, draft => {
		draft.activeChat = chat.activeChat === name ? chat.room : chat.activeChat;
		draft.ignoredUsers.push(id);
		delete draft.chats[name];
	});
};

const close = (chat, chatName) => produce(chat, draft => {
	draft.activeChat = chat.activeChat === chatName ? chat.room : chat.activeChat;
	delete draft.chats[chatName].messages;
});



const chatActions = {
	joinRoom,
	setActive,
	addMessage,
	setPrivate,
	block,
	close
};

export default chatActions;