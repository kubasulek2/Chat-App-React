import React, { Fragment } from 'react';

import WithStyles from '../../hoc/withStyles';
import Sidebar from '../layout/sidebar/Sidebar';
import Board from '../layout/Board';


const App = () => {
	return (
		<Fragment>
			<Sidebar />
			<Board />
		</Fragment>
	);
};

export default WithStyles(App);
