import React from 'react';
import './contact.css';
import contactTitle from '../images/contact.svg';
import ContactLinks from './ContactLinks';
import ContactForm from './ContactForm';
import { StickyContainer, Sticky } from 'react-sticky';
import Waypoint from 'react-waypoint';

class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            entranceAnimation: false // track whether or not entrance animation has been played
        }
    }

    // Change the state, and therefore the class of the elements that need entrance animations
    animateEntrance = ()  => {
        this.setState({ entranceAnimation: true })
    }

    render() {
        // Waypoints are used to trigger entrance animations
        // StickyContainer makes it so section heading follows the section. bottomOffset isn't needed because this is the last component
        return (
            <StickyContainer>
                <div id="Contact" className="section-container">
                    <Waypoint onEnter={ () => this.animateEntrance() } />
                    <div id="contact-content" className={ `content-container ${ this.state.entranceAnimation ? 'animated' : '' }` }>
                        <div id="contact-message">
                            <h2>Get in Touch</h2>
                            <p>Whether you have a project you'd like some help with
                            or just want to say hello, contact me and we can chat.</p>
                        </div>
                        <ContactForm />
                        <ContactLinks />
                    </div>
                    <div id="section-title">
                        <Sticky>
                            {({ style, isSticky }) =>
                                <img style={ style } className={ isSticky ? "sticky" : "" } src={ contactTitle } alt="Contact" />}
                        </Sticky>
                    </div>
                    <Waypoint onEnter={ () => this.animateEntrance() } />
                </div>
            </StickyContainer>
        );
    }
}

export default Contact;