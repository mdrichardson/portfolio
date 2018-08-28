import React, { Component } from 'react';
import './App.css';
import NavBar from './nav/NavBar';
import Hero from './hero/Hero';
import Skills from './skills/Skills';
import Projects from './projects/Projects';
import About from './about/About';
import Contact from './contact/Contact';
import Waypoint from 'react-waypoint';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            navFixed: false
        }
    }

    fixNav = () => this.setState({ navFixed: true });
    unfixNav = () => this.setState({ navFixed: false });
        
    render() {
        return (
            <div>
                <NavBar navFixed={ this.state.navFixed }/>
                <div id="hero-section">
                    <Waypoint onEnter={ this.unfixNav } />
                    <Hero />
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
