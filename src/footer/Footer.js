import React from 'react';
import './footer.css';
import NavLinks from '../nav/NavLinks';

class Footer extends React.Component {

  render() {
    return(
      <div id="footer" className="section-container">
        <div id="footer-container">
          <p id="copyright">© 2018 <span id="footer-name">Michael Richardson</span>, All Rights Reserved</p>
          <NavLinks useId="footer-menu"/>
        </div>
      </div>
    )
  }
}
export default Footer;