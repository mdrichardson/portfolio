import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, Router } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import './index.css';
import App from './App';
import Blog from './blog/Blog';
import FourOhFour from './misc/FourOhFour';
import registerServiceWorker from './registerServiceWorker';
import ReactGA from 'react-ga';

// Enable Google Analytics and track the hash pages
ReactGA.initialize('UA-126123529-1');
ReactGA.pageview("/#Home");
ReactGA.pageview("/#Skills");
ReactGA.pageview("/#Projects");
ReactGA.pageview("/#About");
ReactGA.pageview("/#Contact");
ReactGA.pageview("/Blog");

ReactDOM.render((
    <Router history={ createHistory() }>
        <Switch>
            <Route exact path="/" component={ App } />
            <Route path="/blog" component={ Blog } />
            <Route component={ FourOhFour } />
        </Switch>
    </Router>
), document.getElementById('root')
);
registerServiceWorker();
