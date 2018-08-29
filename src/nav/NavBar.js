import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import './nav.css'
import { NavHashLink as NavLink } from 'react-router-hash-link';

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
                            <li class="navItem"><div><NavLink to="/#Home" smooth activeClassName="selected">Home</NavLink></div></li>
                            <li class="navItem"><div><NavLink to="/#Skills" smooth activeClassName="selected">Skills</NavLink></div></li>
                            <li class="navItem"><div><NavLink to="/#Projects" smooth activeClassName="selected">Projects</NavLink></div></li>
                            <li class="navItem"><div><NavLink to="/#About" smooth activeClassName="selected">About</NavLink></div></li>
                            <li class="navItem"><div><NavLink to="/#Contact" smooth activeClassName="selected">Contact</NavLink></div></li>
                        </ul>
                    </div>
                </Toolbar>
            </AppBar>
            <hr id ="menu-hr" />
        </div>
    )
}
export default NavBar;