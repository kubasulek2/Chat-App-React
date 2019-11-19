import React, { Fragment } from 'react';

import WithStyles from '../../hoc/withStyles';
import Sidebar from '../layout/sidebar/Sidebar';
import ChatBoard from '../layout/ChatBoard';
import Footer from '../layout/Footer';
import Login from '../UI/login/Login';



const App = () => {
	const loggedIn = false;
	return (
		loggedIn ?
			<Fragment>
				<Sidebar />
				<ChatBoard />
				<Footer />
			</Fragment> :
			<Login />

	);
};

export default WithStyles(App);
