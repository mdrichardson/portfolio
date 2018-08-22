import React from 'react';
import './hero.css';
import bracketSVG from '../images/bracket.svg'

const Hero = () => {
    return (
        <div id="Hero">
            <div id="hero-name" className="hide-mobile">
                <p>Michael Richardson <span>=</span></p>
            </div>
            <div id="bracket-container">
                <div className="bracket">
                    <div><img src={ bracketSVG } alt="left_bracket" /></div>
                </div>
                <div id="hero-properties">
                    <p>full_stack: <span className="bool">true</span>,</p>
                    <p>ui_experience: <span className="bool">true</span>,</p>
                    <p>great_to_work_with: <span className="bool">true</span></p>
                </div>
                <div className="bracket">
                    <div><img src={ bracketSVG } alt="right_bracket" className="flip-h" /></div>
                </div>
            </div>
        </div>
    );
}

export default Hero;