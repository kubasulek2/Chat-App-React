import React, { Fragment } from 'react';

import Header from '../Header';
import Drawer from './Drawer';

const Sidebar = ({ rooms, users, myself, setError, dispatchChat }) => {
	const [mobileOpen, setMobileOpen] = React.useState(false);
	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	return (
		<Fragment>
			<Header handleMobile={handleDrawerToggle} />
			<Drawer
				dispatchChat={dispatchChat} 
				mobile={mobileOpen} 
				handleMobile={handleDrawerToggle} 
				rooms={rooms}
				users={users}
				myself={myself}
				setError = {setError}	
			/>
		</Fragment>
	);
};

export default Sidebar;
