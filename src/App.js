import React, { Component } from 'react';
import './App.css';
import NavBar from './nav/NavBar';
import Hero from './hero/Hero';
import Skills from './skills/Skills';
import Projects from './projects/Projects';
import About from './about/About';
import Contact from './contact/Contact';
import Waypoint from 'react-waypoint';
import fancyLog from './misc/fancyLog';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            navFixed: false,
            activeComponent: null
        }
    }

    fixNav = () => this.setState({ navFixed: true });
    unfixNav = () => this.setState({ navFixed: false });

    setActiveComponent = (comp) => this.setState({ activeComponent: comp });

    componentDidMount() {
        fancyLog();
        // Instead of tons of waypoints to catch a refresh, just fix the nav if we're greater than 100px from the top
        if (window.scrollY >= 100) {
            this.fixNav()
        }
    }
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
                        <Waypoint onEnter={ () => { this.fixNav(); this.setActiveComponent('contact') } }  bottomOffset="50%"/>
                        <Contact />
                    </div>
                </main>
                <div id="broken-notification"><p>You broke something. Return the value to <span>true</span> to fix it!</p></div>
            </div>
        )
    }
}

export default App;
