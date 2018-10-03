import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import './nav.css'
import { NavHashLink as NavLink } from 'react-router-hash-link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';


// props.active is set in App.js, using Waypoints. This sets a white underline to the active component

class NavBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            animateClassName: 'load'
        }
    }

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
                document.getElementById('menu-hr').style.marginBottom = '100vh';
            }
            // Add event listener for scrolling so that the menu closes on scroll
            if (this.state.animateClassName !== 'animated') {
                this.watchScroll();
            }
        }
    }

    // Watch for scrolling when menu is open and close menu when scroll initiated
    watchScroll = () => document.addEventListener('scroll', this.closeMenu)

    // Always close the menu when we click on the inner links
    closeMenu = () => {
        // Don't close the menu if it isn't shown anyway -- keeps hr from animating
        if (window.innerWidth <= 800) {
            this.setState({ animateClassName: '' });
            document.getElementById('menu-hr').style.marginBottom = '0';
            document.removeEventListener('scroll', this.closeMenu)
        }
    }

    // When we add the bottom margin to the <hr> it moves everything down 100vh, so we need to scroll that much further when links are clicked
    customScroll = (el) => {
        const offset = window.innerWidth <= 800 && window.scrollY < 64 ? window.innerHeight : 0;
        const position = el.offsetTop - offset;
        window.scroll({
            top: position,
            left: 0,
            behavior: 'smooth'
        })
    }

    render() {
        return(
            <div>
                <AppBar position="static" id="nav" className={ this.props.navFixed ? "fixed" : "" }>
                    <Toolbar id="toolbar">
                        <Typography variant="title" id="header-name">
                            <span className={ !this.props.navFixed ? "hidden" : "shown" }>Michael Richardson</span>
                        </Typography>
                        <div id="menu-container" className={ this.state.animateClassName }>
                        <div id="menu-background"  className={ this.state.animateClassName } style={ window.scrollY >= 64 ? { } : { background: 'none' } }></div>
                            <ul id="menu">
                                <li className="navItem"><div>
                                    { /* This one is a little different so we can get rid of '#Home' in the url bar and still scroll to top */}
                                    <NavLink to="/" onClick={ () => {this.customScroll(document.getElementsByTagName('body')); this.closeMenu()} }>Home</NavLink>
                                </div></li>
                                <li className={ this.props.active === 'skills' ? "active navItem" : "navItem" }><div>
                                    <NavLink to="/#Skills" scroll={el => this.customScroll(el) } onClick={ this.closeMenu }>Skills</NavLink>
                                </div></li>
                                <li className={ this.props.active === 'projects' ? "active navItem" : "navItem" }><div>
                                    <NavLink to="/#Projects" scroll={el => el.scrollIntoView({ behavior: 'smooth', block: 'start' })} onClick={ this.closeMenu }>Projects</NavLink>
                                </div></li>
                                <li className={ this.props.active === 'about' ? "active navItem" : "navItem" }>
                                    <div><NavLink to="/#About" scroll={el => el.scrollIntoView({ behavior: 'smooth', block: 'start' })} onClick={ this.closeMenu }>About</NavLink>
                                </div></li>
                                <li className={ this.props.active === 'contact' ? "active navItem" : "navItem" }><div>
                                    <NavLink to="/#Contact" scroll={el => el.scrollIntoView({ behavior: 'smooth', block: 'start' })} onClick={ this.closeMenu }>Contact</NavLink>
                                </div></li>
                            </ul>
                        </div>
                        <div id="hamburger-menu" onClick={ this.toggleMenuAnimation }>
                            <FontAwesomeIcon icon={faBars} size="2x" />
                        </div>
                    </Toolbar>
                </AppBar>
                <hr id ="menu-hr" className={ this.state.animateClassName }/>
            </div>
        )
    }
}
export default NavBar;