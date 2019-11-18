import React, { Fragment } from 'react';

import WithStyles from '../hoc/withStyles';
import Sidebar from './sidebar/Sidebar';


const App = () => {
	return (
		<Fragment>
			<Sidebar />
		</Fragment>
	);
};

export default WithStyles(App);
