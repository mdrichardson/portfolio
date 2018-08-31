import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import './nav.css'
import { NavHashLink as NavLink } from 'react-router-hash-link';


// props.active is set in App.js, using Waypoints. This sets a white underline to the active component

const NavBar = (props) => {
    return(
        <div>
            <AppBar position="static" id="nav" className={ props.navFixed ? "fixed" : "" }>
                <Toolbar id="toolbar">
                    <Typography variant="title" id="name">
                    <span className={ !props.navFixed ? "hidden" : "" }>Michael Richardson</span>
                    </Typography>
                    <div id="menu-container" className="hide-mobile">
                        <ul id="menu">
                            <li className="navItem"><div>
                                <NavLink to="/#Home" smooth>Home</NavLink>
                            </div></li>
                            <li className={ props.active === 'skills' ? "active navItem" : "navItem" }><div>
                                <NavLink to="/#Skills" smooth>Skills</NavLink>
                            </div></li>
                            <li className={ props.active === 'projects' ? "active navItem" : "navItem" }><div>
                                <NavLink to="/#Projects" smooth>Projects</NavLink>
                            </div></li>
                            <li className={ props.active === 'about' ? "active navItem" : "navItem" }>
                                <div><NavLink to="/#About" smooth>About</NavLink>
                            </div></li>
                            <li className={ props.active === 'contact' ? "active navItem" : "navItem" }><div>
                                <NavLink to="/#Contact" smooth>Contact</NavLink>
                            </div></li>
                        </ul>
                    </div>
                </Toolbar>
            </AppBar>
            <hr id ="menu-hr" />
        </div>
    )
}
export default NavBar;