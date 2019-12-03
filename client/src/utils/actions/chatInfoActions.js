const setMyself = (state, myself) => ({ ...state, myself: myself });

const setRooms = (state, rooms) => ({ ...state, rooms: rooms });

const setUsers = (state, users) => ({ ...state, users: users });

const chatInfoActions = {
	setMyself,
	setRooms,
	setUsers
};

export default chatInfoActions;