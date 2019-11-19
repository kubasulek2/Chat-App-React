import React, { Fragment } from 'react';
import Divider from '@material-ui/core/Divider';

import WithStyles from '../../hoc/withStyles';
import Sidebar from '../layout/sidebar/Sidebar';
import ChatBoard from '../chat/MainBoard';
import Footer from '../layout/Footer';
import Login from '../UI/login/Login';



const App = () => {
	const loggedIn = true;
	return (
		loggedIn ?
			(
				<Fragment>
					<Sidebar />
					<ChatBoard />
					<Divider />
					<Footer />
				</Fragment>
			) :
			<Login />

	);
};

export default WithStyles(App);
