import chatInfoActions from '../actions/chatInfoActions';

/**
 * @module chatInfoActions - Helper functions for handling state.
 */

/* ChatInfo reducer */
const chatInfoReducer = (state, action) => {
	
	switch (action.type) {
		case 'SET_MYSELF':
			return chatInfoActions.setMyself(state, action.myself);
		
		case 'SET_ROOMS':
			return chatInfoActions.setRooms(state, action.rooms);

		case 'SET_USERS':
			return chatInfoActions.setUsers(state, action.users);
	
		default:
			return state;
	}
};

export default chatInfoReducer;