import React from 'react';
import './about.css';
import aboutTitle from '../images/about.svg';
import AboutMeText from './AboutMeText';
import OtherDetails from './OtherDetails';

class About extends React.Component {

    render() {
        return (
            <div id="About">
                <div className="section-title">
                    <img src={ aboutTitle } alt="About" />
                </div>
                <div id="about-me">
                    { AboutMeText }
                </div>
                <OtherDetails />
            </div>
        );
    }
}

export default About;