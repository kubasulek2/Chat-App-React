import usersActions from '../actions/usersActions';

const usersReducer = (state, action) => {
	
	switch (action.type) {
		case 'SET_MYSELF':
			return usersActions.setMyself(state, action.myself);
	
		default:
			return state;
	}
};

export default usersReducer;