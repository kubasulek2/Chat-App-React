import produce from 'immer';

const setMyself = (state, myself) => produce(state, draft => { draft.myself = myself; });

const usersActions = {
	setMyself,
};

export default usersActions;