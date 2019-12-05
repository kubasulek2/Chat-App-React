import React, { useContext, useEffect, Fragment, Suspense, lazy } from 'react';

import { AppStateContext } from '../containers/App';
import Login from '../components/UI/login/Login';
import ErrorModal from '../components/UI/feedback/ErrorModal';
import Loader from './UI/Loader';

/* Container Component for lazy load main chat. */
const AppContainer = () => {

	/* Use Context. */
	const { logged } = useContext(AppStateContext);

	/* Lazy Load. */
	const Chat = lazy( () => import('./Chat'));

	return (
		<Fragment>
			<ErrorModal />
			{logged
				? <Suspense fallback={<Loader />}>
					<Chat />
				</Suspense>
				: <Login />}

		</Fragment>
	);
}

export default AppContainer;
