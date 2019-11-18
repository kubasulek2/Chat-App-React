import React, { useEffect, useState } from 'react';
import { socket } from './socket';

const App = () => {
	const [ counter, setCounter ] = useState();
	useEffect(() => {
		socket.on('countUpdated', payload => {
			setCounter(payload);
		});
	}, []);

	const handleClick = () => {
		socket.emit('increment');
	};




	return (
		<React.Fragment>
			<h1>{counter}</h1>
			<button onClick={handleClick}>Increment</button>
		</React.Fragment>
	);

};

export default App;
