import React from 'react';
import './footer.css';
import NavLinks from '../nav/NavLinks';

class Footer extends React.Component {

    render() {
        return(
            <div id="footer" class="section-container">
                <div id="footer-container">
                    <p id="copyright">© 2018 <span id="footer-name">Michael Richardson</span>, All Rights Reserved</p>
                    <NavLinks />
                </div>
            </div>
        )
    }
}
export default Footer;