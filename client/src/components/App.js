import React, { Fragment } from 'react';

import WithStyles from '../hoc/withStyles';
import Header from './Header';

const App = () => {
	return (
		<Fragment>
			<Header />
		</Fragment>
	);
};

export default WithStyles(App);
