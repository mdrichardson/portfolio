import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import './nav.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import NavLinks from './NavLinks';


// props.active is set in App.js, using Waypoints. This sets a white underline to the active component

class NavBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            animateClassName: 'load'  // Used for animating the nav bar expansion in mobile. 'load' just prevents it from loading when the page loads
        }
    }

    // Always close the menu when we click on the inner links
    closeMenu = () => {
      // Don't close the menu if it isn't shown anyway -- keeps hr from animating
      if (window.innerWidth <= 800) {
        this.setState({ animateClassName: '' });
        document.getElementById('menu-hr').style.marginBottom = '0';
        document.removeEventListener('scroll', this.closeMenu)
      }
    }

    // Watch for scrolling when menu is open and close menu when scroll initiated
    watchScroll = () => document.addEventListener('scroll', this.closeMenu)

    toggleMenuAnimation = () => {
      // Only animate if hamburger menu shown (smaller screens)
      if (window.innerWidth <= 800) {
        // We need a separate state for animateClassName so that animation doesn't start on page load--only when menu is expanded
        let animateClassName = this.state.animateClassName === 'animated' ? '' : 'animated' ;
        this.setState({ animateClassName })
        // If menu is open, we need to make sure it closes
        if (this.state.animateClassName === 'animated') {
          this.closeMenu();
          // We need to set the bottom margin of the hr dynamically so it only applies when it's visible, which is when we're at the top of the page
        } else if (window.scrollY < 64){
          let marginBottom = this.props.navHrHidden ? '35vh' : '100vh;'
          document.getElementById('menu-hr').style.marginBottom = marginBottom;
        }
        // Add event listener for scrolling so that the menu closes on scroll
        if (this.state.animateClassName !== 'animated') {
          this.watchScroll();
        }
      }
    }

    render() {
      return(
        <div>
          <AppBar position="static" id="nav" className={ this.props.navFixed ? "fixed" : "" }>
            <Toolbar id="toolbar">
              <Typography variant="title" id="header-name">
                <span className={ !this.props.navFixed && this.props.navHrHidden !== true ? "hidden" : "shown" }>Michael Richardson</span>
              </Typography>
              <div id="menu-container" className={ this.state.animateClassName }>
                <div id="menu-background"  className={ this.state.animateClassName } style={ window.scrollY >= 64 ? { } : { background: 'none' } }></div>
                <NavLinks />
              </div>
              <div id="hamburger-menu" onClick={ this.toggleMenuAnimation }>
                <FontAwesomeIcon icon={faBars} size="2x" />
              </div>
            </Toolbar>
          </AppBar>
          <hr id ="menu-hr" className={ this.state.animateClassName } style={ this.props.navHrHidden ? { opacity: '0' } : {} }/>
        </div>
      )
    }
}
export default NavBar;