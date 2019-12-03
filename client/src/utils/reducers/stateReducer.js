import stateActions from '../actions/stateActions';

const stateReducer = (state, action) => {
	
	switch (action.type) {
		case 'JOIN':
			return stateActions.join(state, action.myself);

		case 'SET_ERROR':
			return stateActions.setError(state, action.message, action.errType);

		case 'CANCEL_ERROR':
			return stateActions.cancelError(state);

		case 'SHOW_TOAST':
			return stateActions.showToast(state, action.message);

		case 'HIDE_TOAST':
			return stateActions.hideToast(state);
	
		default:
			return state;
	}
};

export default stateReducer;