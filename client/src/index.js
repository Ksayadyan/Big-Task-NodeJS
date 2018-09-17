import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
import registerServiceWorker from './registerServiceWorker';
import App from "./login";
import './index.css'

ReactDOM.render(<App/>, document.getElementById('root'));
registerServiceWorker();
