import React, { Fragment } from 'react';

import Header from '../Header';
import Drawer from './Drawer';

const Sidebar = ({ rooms, users, myself }) => {
	const [mobileOpen, setMobileOpen] = React.useState(false);
	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	return (
		<Fragment>
			<Header handleMobile={handleDrawerToggle} />
			<Drawer 
				mobile={mobileOpen} 
				handleMobile={handleDrawerToggle} 
				rooms={rooms}
				users={users}
				myself={myself}	
			/>
		</Fragment>
	);
}

export default Sidebar;
