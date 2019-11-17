import React, { useState, useEffect } from 'react';
import openSocket from 'socket.io-client';
const socketIOClient = openSocket('http://localhost:5000');


function App () {
	const [ port ] = useState('http://localhost:5000');
	const [counter, setCounter] = useState();
	
	const updateCounter = () => {
	};
	
	useEffect(() => {
		const socket = socketIOClient.open(port);
		socket.on('countUpdated', () => {
			console.log('The Count has been updated');
		});
		
	},[]);

	return (
		<React.Fragment>
			<h1>I'm working</h1>
			<button onClick={updateCounter}>Increment</button>
		</React.Fragment>
	);
}

export default App;
