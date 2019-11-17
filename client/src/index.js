import React from 'react';
import ReactDOM from 'react-dom';
import openSocket from 'socket.io-client';

import './index.css';
import App from './App';

const socket = openSocket('http://localhost:5000');

ReactDOM.render(<App />, document.getElementById('root'));
