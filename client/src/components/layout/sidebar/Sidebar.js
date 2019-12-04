import React, { Fragment, useCallback } from 'react';

import Header from '../Header';
import Drawer from './Drawer';

/* Stateful Component -  grouping together Header and Drawer components, which together compose a application navigation. */
const Sidebar = () => {

	/* Local state for switch display of Drawer component on small screens*/
	const [mobileOpen, setMobileOpen] = React.useState(false);

	/* handling opening and closing mobile nav. Created with useCallback to prevent unnecessary renders. */
	const handleDrawerToggle = useCallback(() => {
		setMobileOpen(!mobileOpen);
	}, [mobileOpen]);

	return (
		<Fragment>
			<Header handleMobile={handleDrawerToggle} />
			<Drawer
				mobile={mobileOpen}
				handleMobile={handleDrawerToggle}
			/>
		</Fragment>
	);
};

export default Sidebar;
