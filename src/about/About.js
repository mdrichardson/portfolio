import React from 'react';
import './about.css';
import aboutTitle from '../images/about.svg';
import AboutMeText from './AboutMeText';
import OtherDetails from './OtherDetails';
import { StickyContainer, Sticky } from 'react-sticky';
import Waypoint from 'react-waypoint';

class About extends React.Component {

    constructor() {
        super();
        this.state = {
            entranceAnimation: false
        }
    }

    animateEntrance = ()  => {
        this.setState({ entranceAnimation: true })
    }

    render() {
        return (
            <StickyContainer>
                <div id="About" className="section-container">
                    <div className="section-title">
                        <Sticky bottomOffset={100}>
                            {({ style, isSticky }) =>
                                <img style={ style } className={ isSticky ? "sticky" : "" } src={ aboutTitle } alt="About" />}
                        </Sticky>
                    </div>
                    <div className="content-container">
                        <Waypoint onEnter={ () => this.animateEntrance() } />
                        <div id="about-me"className={ this.state.entranceAnimation ? 'animated' : '' }>
                            { AboutMeText }
                        </div>
                        <OtherDetails className={ this.state.entranceAnimation ? 'animated' : '' }/>
                        <Waypoint onEnter={ () => this.animateEntrance() } />
                    </div>
                </div>
            </StickyContainer>
        );
    }
}

export default About;