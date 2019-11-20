import React, { Fragment, useState, useEffect } from 'react';
import Divider from '@material-ui/core/Divider';

import WithStyles from '../hoc/withStyles';
import Sidebar from '../components/layout/sidebar/Sidebar';
import ChatBoard from '../components/chat/MainBoard';
import Footer from '../components/layout/Footer';
import Login from '../components/UI/login/Login';



const App = () => {
	
	const [ logged, setLogged ] = useState(true);
	const [ pending, setPending ] = useState(false);
	
	return (
		logged ?
			(
				<Fragment>
					<Sidebar />
					<ChatBoard />
					<Divider />
					<Footer
						pending={pending}
						setPending={setPending}
					/>
				</Fragment>
			) :
			<Login />

	);
};

export default WithStyles(App);
