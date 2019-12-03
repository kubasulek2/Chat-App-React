import produce from 'immer';

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
		draft.chats[channel].messages.push(message);
		draft.chats[channel].unread = channel !== chat.activeChat;
	});
};

const setPrivate = (chat, id, userName) => produce(chat, draft => {
	draft.chats[userName] = { id, messages: [] };
});


const block = (chat, id, userName) => {
	const chats = { ...chat.chats };
	//chats[userName] = { id, messages: [] };

	return { ...chat, chats };
};

const close = (chat, chatName) => produce(chat, draft => {
	draft.activeChat = chat.activeChat === chatName ? chat.room : chat.activeChat;
	draft.chats[chatName].messages = [];
});



export const chatActions = {
	joinRoom,
	setActive,
	addMessage,
	setPrivate,
	block,
	close
};