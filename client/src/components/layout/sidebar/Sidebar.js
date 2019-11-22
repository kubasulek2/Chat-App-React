import React, { Fragment } from 'react';

import Header from '../Header';
import Drawer from './Drawer';

const Sidebar = () => {
	const [ mobileOpen, setMobileOpen ] = React.useState(false);
	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	return (
		<Fragment>
			<Header handleMobile={handleDrawerToggle} />
			<Drawer mobile={mobileOpen} handleMobile={handleDrawerToggle}/>
		</Fragment>
	);
}

export default Sidebar;
