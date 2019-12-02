const joinRoom = (chat, room) => {
	const chats = { ...chat.chats };
	
	delete chats[chat.room];
	
	chats[room] = { id: room, messages: [], unread: false };

	return {
		...chat,
		activeChat: room,
		chats: chats,
		room
	};
};

const setActive = (chat, active) => ({ ...chat, activeChat: active });

const addMessage = (chat, message) => {
	const chats = { ...chat.chats };
	const channel = message.privy ? message.sender : chat.room;
	const messages = chats[channel].messages;

	chats[channel].messages = [...messages, message];
	chats[channel].unread = channel !== chat.activeChat;

	return { ...chat, chats };
};

const setPrivate = (chat, id, userName) => {
	const chats = { ...chat.chats };

	chats[userName] = { id, messages: [] };
	
	return { ...chat, chats };
};



export const chatActions = {
	joinRoom,
	setActive,
	addMessage,
	setPrivate
};