import React from 'react';
import { NavHashLink as NavLink } from 'react-router-hash-link';
import { NavLink as Link } from 'react-router-dom';

class NavLinks extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            animateClassName: 'load',
            homeLink: ''
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

    // We set the home link programatically because if we leave it as '/#Home', 
    //   when we go to home from the blog, it will scroll down more than we want. This way, it starts at the top
    setHomeLink = () => {
      if (this.userOnBlog()) {
        this.setState({ homeLink: '/'})
      } else {
        this.setState({ homeLink: '/#Home' })
      }
    }

    userOnBlog = () => {
      const pathname = new URL(window.location.href).pathname;
      return pathname.includes('blog')
    }

    componentDidMount() {
      this.setHomeLink();
    }

    render() {
        return(
            <ul id="menu">
                <li className="navItem">
                    <NavLink to={ this.state.homeLink } scroll={el => el.scrollIntoView({ behavior: 'smooth', block: 'start' })} onClick={ this.closeMenu }>Home</NavLink>
                </li>
                <li className={ this.props.active === 'skills' ? "active navItem" : "navItem" }>
                    <NavLink to="/#Skills" scroll={el => this.customScroll(el) } onClick={ this.closeMenu }>Skills</NavLink>
                </li>
                <li className={ this.props.active === 'projects' ? "active navItem" : "navItem" }>
                    <NavLink to="/#Projects" scroll={el => el.scrollIntoView({ behavior: 'smooth', block: 'start' })} onClick={ this.closeMenu }>Projects</NavLink>
                </li>
                <li className={ this.props.active === 'about' ? "active navItem" : "navItem" }>
                    <NavLink to="/#About" scroll={el => el.scrollIntoView({ behavior: 'smooth', block: 'start' })} onClick={ this.closeMenu }>About</NavLink>
                </li>
                <li className={ this.props.active === 'blog' ? "active navItem" : "navItem" }>
                    <Link to="/blog" onClick={ this.closeMenu }>Blog</Link>
                </li>
                <li className={ this.props.active === 'contact' ? "active navItem" : "navItem" }>
                    <NavLink to="/#Contact" scroll={el => el.scrollIntoView({ behavior: 'smooth', block: 'start' })} onClick={ this.closeMenu }>Contact</NavLink>
                </li>
            </ul>
        )
    }
}
export default NavLinks;