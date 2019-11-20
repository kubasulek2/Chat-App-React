import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';

const TooltipComp = ({message, children}) => {
	return (
		<Tooltip title={message}>
			{children}
		</Tooltip>
	);
};

export default TooltipComp;
