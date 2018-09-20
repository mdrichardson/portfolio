import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import ReactGA from 'react-ga';

// Enable Google Analytics and track the hash pages
ReactGA.initialize('UA-126123529-1');
ReactGA.pageview("/#Home");
ReactGA.pageview("/#Skills");
ReactGA.pageview("/#Projects");
ReactGA.pageview("/#About");
ReactGA.pageview("/#Contact");

ReactDOM.render((
    <Router>
        <App />
    </Router>
), document.getElementById('root')
);
registerServiceWorker();
