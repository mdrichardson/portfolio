import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
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


// Must have basename in order for github pages to work
ReactDOM.render((
  <Router basename={process.env.PUBLIC_URL}>
    <Switch>
      <Route exact path="/" component={ App } />
      <Route path="/blog" component={ Blog } />
      <Route component={ FourOhFour } />
    </Switch>
  </Router>
), document.getElementById('root')
);
registerServiceWorker();
