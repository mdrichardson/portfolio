import React from 'react';
import { NavHashLink as NavLink } from 'react-router-hash-link';

class NavLinks extends React.Component {

    render() {
        return(
            <ul id="menu">
                <li className="navItem"><div>
                    <NavLink to="/#Home" scroll={el => el.scrollIntoView({ behavior: 'smooth', block: 'start' })} onClick={ this.closeMenu }>Home</NavLink>
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
        )
    }
}
export default NavLinks;