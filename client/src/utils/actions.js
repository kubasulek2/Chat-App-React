const joinChat = (chat, room) => {
	const chats = { ...chat.chats };

	chats[room] = { id: room, messages: [], unread: false };

	return {
		...chat,
		activeChat: room,
		chats: chats,
		room
	};
};

const setActive = (chat, active) => ({...chat, activeChat: active}); 

const addMessage = (chat, message) => {
	const chats = {...chat.chats};
	//const channel = message.privy ?
	const messages = chats[chat.room].messages;

	chats[chat.activeChat].messages = [...messages, message];
	return { ...chat, chats };
}; 



export const chatActions = {
	joinChat,
	setActive,
	addMessage
};