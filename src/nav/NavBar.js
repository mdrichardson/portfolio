import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import './nav.css'
import { NavHashLink as NavLink } from 'react-router-hash-link';

const NavBar = () => {
    return(
        <div>
        <AppBar position="static" id="nav">
            <Toolbar id="toolbar">
                <Typography variant="title" id="name">
                Michael Richardson
                </Typography>
                <div id="menu-container" className="hide-mobile">
                    <ul id="menu">
                        <li><div><NavLink to="/#Hero" smooth activeClassName="selected">Home</NavLink></div></li>
                        <li><div><NavLink to="/#Skills" smooth activeClassName="selected">Skills</NavLink></div></li>
                        <li><div><NavLink to="/#Projects" smooth activeClassName="selected">Projects</NavLink></div></li>
                        <li><div><NavLink to="/#About" smooth activeClassName="selected">About</NavLink></div></li>
                        <li><div><NavLink to="/#Contact" smooth activeClassName="selected">Contact</NavLink></div></li>
                    </ul>
                </div>
            </Toolbar>
        </AppBar>
        <hr id ="menu-hr" />
        </div>
    )
}
export default NavBar;