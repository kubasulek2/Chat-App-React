import React, { Fragment } from 'react';

import WithStyles from '../hoc/withStyles';
import Sidebar from './sidebar/Sidebar';
import Board from './Board';


const App = () => {
	return (
		<Fragment>
			<Sidebar />
			<Board />
		</Fragment>
	);
};

export default WithStyles(App);
