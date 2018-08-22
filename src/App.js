import React, { Component } from 'react';
import './App.css';
import NavBar from './nav/NavBar'
import Hero from './hero/Hero'
import Skills from './skills/Skills'

class App extends Component {
  render() {
    return (
        <div>
            <NavBar />
            <div id="hero-section">
                <Hero />
                <Skills />
            </div>
        </div>
    )
  }
}

export default App;
