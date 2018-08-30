import React from 'react';
import './about.css';
import aboutTitle from '../images/about.svg';
import AboutMeText from './AboutMeText';
import OtherDetails from './OtherDetails';
import { StickyContainer, Sticky } from 'react-sticky';

class About extends React.Component {

    render() {
        return (
            <StickyContainer>
                <div id="About" className="section-container">
                    <div className="section-title">
                        <Sticky bottomOffset={150}>
                            {({ style, isSticky }) =>
                                <img style={ style } className={ isSticky ? "sticky" : "" } src={ aboutTitle } alt="About" />}
                        </Sticky>
                    </div>
                    <div className="content-container">
                        <div id="about-me">
                            { AboutMeText }
                        </div>
                        <OtherDetails />
                    </div>
                </div>
            </StickyContainer>
        );
    }
}

export default About;