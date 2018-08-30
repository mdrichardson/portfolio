import React from 'react';
import './contact.css';
import contactTitle from '../images/contact.svg';
import ContactLinks from './ContactLinks';
import ContactForm from './ContactForm';

class Contact extends React.Component {

    render() {
        return (
            <div id="Contact" className="section-container">
                <div id="contact-content" className="content-container">
                    <ContactLinks />
                    <ContactForm />
                </div>
                <div id="section-title">
                    <img src={ contactTitle } alt="Contact" />
                </div>
            </div>
        );
    }
}

export default Contact;