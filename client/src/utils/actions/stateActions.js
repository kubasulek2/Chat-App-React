const setError = (state, message, type) => ({
	...state,
	error: {
		message,
		type
	}
});

const cancelError = (state) => ({
	...state,
	error: false,
	pending: false,
});

const join = (state) => ({
	...state,
	pending: false,
	logged: true
});

const showToast = (state, message) => ({
	...state,
	toast: {
		open: true,
		message
	}
});

const hideToast = (state) => ({
	...state,
	toast: {
		open: false,
		message: null
	}
});
const setPending = (state, pending) => ({
	...state,
	pending: pending
});

const usersActions = {
	setError,
	cancelError,
	join,
	showToast,
	hideToast,
	setPending
};

export default usersActions;