import stateActions from '../actions/stateActions';

/**
 * @requires stateActions - Helper functions for handling state.
 */

/* AppState reducer */
const stateReducer = (state, action) => {
	
	switch (action.type) {
		case 'JOIN':
			return stateActions.join(state, action.myself);

		case 'SET_ERROR':
			return stateActions.setError(state, action.message, action.errType);

		case 'SET_PENDING':
			return stateActions.setPending(state, action.pending);

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