const joinChat = (chat, room) => {
	const chats = { ...chat.chats };

	chats.main = { id: room, messages: [], unread: false };

	return {
		...chat,
		activeChat: 'main',
		chats: chats
	};
};

const setActive = (chat, active) => ({...chat, activeChat: active}); 


export const chatActions = {
	joinChat,
	setActive
};