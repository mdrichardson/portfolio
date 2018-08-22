import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import './nav.css'

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
                        <li><div><a href="#Hero">Home</a></div></li>
                        <li><div><a href="#Skills">Skills</a></div></li>
                        <li><div><a href="#Projects">Projects</a></div></li>
                        <li><div><a href="#About">About</a></div></li>
                        <li><div><a href="#Contact">Contact</a></div></li>
                    </ul>
                </div>
            </Toolbar>
        </AppBar>
        <hr id ="menu-hr" />
        </div>
    )
}
export default NavBar;