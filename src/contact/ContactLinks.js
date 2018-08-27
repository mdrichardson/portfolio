import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'

class ContactLinks extends React.Component {

    fa_size = '2x'

    render() {
        return (
            <div id="contact-links">
                <a id="github-link" href="https://github.com/mdrichardson" title="mdrichardson GitHub">
                    <FontAwesomeIcon icon={ faGithub } size={this.fa_size} />
                    <p>mdrichardson</p>
                </a>
                <a id="linkedin-link" href="https://www.linkedin.com/in/richardsonmichaeld/" title="Michael Richardson LinkedIn">
                    <FontAwesomeIcon icon={ faLinkedin } size={this.fa_size} />
                    <p>Michael Richardson</p>
                </a>
            </div>
        );
    }
}

export default ContactLinks;