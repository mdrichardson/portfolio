import React, { Component } from 'react';
import './App.css';
import NavBar from './nav/NavBar';
import Hero from './hero/Hero';
import Skills from './skills/Skills';
import Projects from './projects/Projects';
import About from './about/About';
import Contact from './contact/Contact';
import Waypoint from 'react-waypoint';

// Styling for fancy messages in dev console
const logFName = [
    'background: #F71735',
    'color: white',
    'font-size: 20px'
].join(';');

const logLName = [
    'background: #FCAB10',
    'color: white',
    'font-size: 20px'
].join(';');

const logHeader = [
    'color: black',
    'font-size: 16px',
    'font-weight: bold'
].join(';');

const logMessage = [
    'color: black',
    'font-size: 14px'
].join(';');

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            navFixed: false
        }
    }

    fixNav = () => this.setState({ navFixed: true });
    unfixNav = () => this.setState({ navFixed: false });

    componentDidMount() {
        // Fancy welcome message in dev console
        console.log('%c  Michael %c Richardson  ', logFName, logLName);
        console.log('%cWelcome to my portfolio!', logHeader);
        console.log('%cIf you\'re reading this, you\'re either trying to break my page or see ' +
                    'if I\'m a half decent developer. If you think I am, contact me:', logMessage);
        console.log('%chttps://www.mdrichardson.net/#Contact', logMessage);
    }
        
    render() {
        return (
            <div>
                <NavBar navFixed={ this.state.navFixed }/>
                <div id="hero-section">
                    <Waypoint onEnter={ this.unfixNav } />
                    <Hero hideArrow={ this.state.navFixed }/>
                    <Waypoint onLeave={ this.fixNav } topOffset="50%"/>
                    <Skills />
                </div>
                <Projects />
                <div id="about-section">
                    <About />
                    <Contact />
                </div>
            </div>
        )
    }
}

export default App;
