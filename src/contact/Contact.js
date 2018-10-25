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
        </div>
      </StickyContainer>
    );
  }
}

export default Contact;