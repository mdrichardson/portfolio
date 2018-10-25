import React, { Component } from 'react';
import './App.css';
import NavBar from './nav/NavBar';
import Hero from './hero/Hero';
import Skills from './skills/Skills';
import Projects from './projects/Projects';
import About from './about/About';
import RelatedArticles from './blog/articles/RelatedArticles';
import Contact from './contact/Contact';
import Footer from './footer/Footer';
import Waypoint from 'react-waypoint';
import fancyLog from './misc/fancyLog';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      navFixed: false, // Whether or not nav bar is fixed to top
      activeComponent: null  // Which component is in view, for highlighting menu
    }
  }

    // Fix the nav bar to the top
    fixNav = () => this.setState({ navFixed: true });

    // Unfix the nav bar
    unfixNav = () => this.setState({ navFixed: false });

    // Set which component is active. Triggered by view
    setActiveComponent = (comp) => this.setState({ activeComponent: comp });

    clearUpdateNotification = () => {
        const updateNotificationEl = document.getElementById('update-notification');
        updateNotificationEl.style.display = 'none';
    }

    refreshPageAndClearUpdateNotification = () => {
        this.clearUpdateNotification();
        document.location.reload();
    }

    componentDidMount() {
      // Fancy message in console.log
      fancyLog();
      // Instead of tons of waypoints to catch a refresh, just fix the nav if we're greater than 100px from the top
      if (window.scrollY >= 100) {
        this.fixNav()
      }
    }
    // The Waypoints are used for setting the active component (highlighting the link in the nav)
    // setActiveComponent uses a bottomOffset of 50% to make sure we don't activate the nav link before we're really in the component
    render() {
        return (
            <div>
                <NavBar navFixed={ this.state.navFixed } active={ this.state.activeComponent } />
                <main>
                    <div id="hero-section">
                        <Waypoint onEnter={ () => { this.fixNav(); this.setActiveComponent('home') } }  bottomOffset="50%"/>
                        <Waypoint onEnter={ this.unfixNav } />
                        <Hero hideArrow={ this.state.navFixed }/>
                        <Waypoint onEnter={ () => { this.fixNav(); this.setActiveComponent('skills') } }  bottomOffset="50%"/>
                        <Skills />
                    </div>
                    <Waypoint onEnter={ () => { this.fixNav(); this.setActiveComponent('projects') } }  bottomOffset="50%"/>
                    <Projects />
                    <Waypoint onEnter={ () => { this.fixNav(); this.setActiveComponent('projects') } }  topOffset="50%"/>
                    <Waypoint onEnter={ () => { this.fixNav(); this.setActiveComponent('about') } }  bottomOffset="50%"/>
                    <div id="about-section">
                      <About />
                      <div id="related">
                        <RelatedArticles sectionTitle="blog" loadAll={ true }/>
                      </div>
                      <Waypoint onEnter={ () => { this.fixNav(); this.setActiveComponent('contact') } }  bottomOffset="50%"/>
                      <Contact />
                    </div>
                </main>
                { /* broken-notification is shown when Easter Egg is activated */ }
                <div id="broken-notification"><p>You broke something. Return the value to <span>true</span> to fix it!</p></div>
                { /* broken-notification is shown when a service worker update is available */ }
                <div id="update-notification">
                    <div id="update-message">
                        A content update is available.
                    </div>
                    <div id="update-actions">
                        <div id="refresh" onClick={ this.refreshPageAndClearUpdateNotification }>REFRESH</div>
                        <div id="dismiss" onClick={ this.clearUpdateNotification }>DISMISS</div>
                    </div>
                </div>
                <Footer />
                <div id="broken-notification"><p>You broke something. Return the value to <span>true</span> to fix it!</p></div>
            </div>
      )
    }
}

export default App;
