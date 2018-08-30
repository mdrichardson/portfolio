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
            navFixed: false
        }
    }

    fixNav = () => this.setState({ navFixed: true });
    unfixNav = () => this.setState({ navFixed: false });

    componentDidMount() {
        fancyLog();
    }
    // We put a lot of Waypoints here so that we can ensure the Nav sticks, even if we refresh the page and start at the bottom
    render() {
        return (
            <div>
                <NavBar navFixed={ this.state.navFixed }/>
                <main>
                    <div id="hero-section">
                        <Waypoint onEnter={ this.unfixNav } />
                        <Hero hideArrow={ this.state.navFixed }/>
                        <Waypoint onLeave={ this.fixNav } topOffset="50%"/>
                        <Skills />
                        <Waypoint onEnter={ this.fixNav } />
                    </div>
                    <Waypoint onEnter={ this.fixNav } />
                    <Projects />
                    <Waypoint onEnter={ this.fixNav } />
                    <div id="about-section">
                        <Waypoint onEnter={ this.fixNav } />
                        <About />
                        <Waypoint onEnter={ this.fixNav } />
                        <Contact />
                    </div>
                </main>
                <div id="broken-notification"><p>You broke something. Return the value to <span>true</span> to fix it!</p></div>
            </div>
        )
    }
}

export default App;
