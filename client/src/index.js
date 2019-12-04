import React from 'react';
import ReactDOM from 'react-dom';

import App from './containers/App';
import Chat from './components/Chat';

const app = (
	<App>
		<Chat />
	</App>);
	
ReactDOM.render(app, document.getElementById('root'));
