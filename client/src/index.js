import React from 'react';
import ReactDOM from 'react-dom';

import App from './containers/App';
import AppContainer from './components/AppContainer';

const app = (
	<App>
		<AppContainer />
	</App>);
	
ReactDOM.render(app, document.getElementById('root'));
