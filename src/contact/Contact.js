import React from 'react';
import './contact.css';
import contactTitle from '../images/contact.svg';
import ContactLinks from './ContactLinks';
import ContactForm from './ContactForm';
import { StickyContainer, Sticky } from 'react-sticky';

class Contact extends React.Component {

    render() {
        return (
            <StickyContainer>
                <div id="Contact" className="section-container">
                    <div id="contact-content" className="content-container">
                        <ContactLinks />
                        <ContactForm />
                    </div>
                    <div id="section-title">
                        <Sticky>
                            {({ style, isSticky }) =>
                                <img style={ style } className={ isSticky ? "sticky" : "" } src={ contactTitle } alt="Contact" />}
                        </Sticky>
                    </div>
                </div>
            </StickyContainer>
        );
    }
}

export default Contact;