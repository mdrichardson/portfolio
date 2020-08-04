import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';
import resume from '../misc/RichardsonResume.pdf'

class ContactLinks extends React.Component {

    // Size of fontawesome icons, using FA's preferred '2x', '3x', etc
    fa_size = '2x'

    render() {
        return (
            <div id="contact-links">
                <a id="github-link" href="https://github.com/mdrichardson" title="mdrichardson GitHub" target="_blank" rel="noopener noreferrer" className="hvr-grow">
                    <FontAwesomeIcon icon={ faGithub } size={this.fa_size} />
                    <p>mdrichardson</p>
                </a>
                <a id="linkedin-link" href="https://www.linkedin.com/in/richardsonmichaeld/" title="Michael Richardson LinkedIn" target="_blank" rel="noopener noreferrer" className="hvr-grow">
                    <FontAwesomeIcon icon={ faLinkedin } size={this.fa_size} />
                    <p>Michael Richardson</p>
                </a>
                <a id="resume-link" href={ resume } title="Michael Richardson Resume" target="_blank" rel="noopener noreferrer" className="hvr-grow" download>
                    <FontAwesomeIcon icon={ faFileAlt } size={this.fa_size} />
                    <p>Resumé</p>
                </a>
            </div>
        );
    }
}

export default ContactLinks;