import React from 'react';
import './blog.css';
import LoginForm from './admin/LoginForm';
import NavBar from '../nav/NavBar';
import blogTitle from '../images/blog.svg';
import Articles from './articles/Articles';
import ArticleView from './articles/ArticleView';
import NewPost from './admin/NewPost';
import AdminToolbar from './admin/AdminToolbar';
import Footer from '../footer/Footer';
import { StickyContainer, Sticky } from 'react-sticky';
import { Route } from 'react-router-dom';
import Waypoint from 'react-waypoint';

class Blog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userIsAdmin: false,
            navFixed: false,
            token: ''
        }
    }

    // Fix the nav bar to the top
    fixNav = () => {
        this.setState({ navFixed: true });
        let blogHr = document.getElementById('blog-hr');
        blogHr.style.marginTop = '64px';
        
    }

    // Unfix the nav bar
    unfixNav = () => {
        this.setState({ navFixed: false });
        let blogHr = document.getElementById('blog-hr');
        blogHr.style.marginTop = 0;
    }

    blogHome = () => {
    
        return (
            <StickyContainer>
                <div id="blog" className="section-container">
                    <Articles />
                    <div className="section-title">
                        <Sticky bottomOffset={130} topOffset={100}>
                            {({ style, isSticky }) =>
                                <img style={ style } className={ isSticky ? "sticky" : "" } src={ blogTitle } alt="Blog" />}
                        </Sticky>
                    </div>
                </div>
                <div id="login" onMouseLeave={ this.hideLoginForm }>
                    <LoginForm />
                </div>
            </StickyContainer>
        )
    }

    validateToken = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const res = await fetch('https://www.mdrichardson.net:3100/blog/admin/validateToken', {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        token: token,
                    })
                })
                const status = await res.status;
                if (status === 200) {
                    console.log('Successful Login with Valid Token!!')
                    this.setState({ userIsAdmin: true });
                    this.setState({ token: token });
                }
            } catch(err) {
                console.error(err);
            }
        } else {
            return false
        }
    }

    showLoginForm = () => {
        const loginForm = document.getElementById('blog-login-container');
        loginForm.style.display = 'block';
    }

    hideLoginForm = () => {
        const loginForm = document.getElementById('blog-login-container');
        loginForm.style.display = 'none';
    }

    watchForLoginHotkeys = (event) => {
        // 76 = "L" key, for "login"
        if (event.ctrlKey && event.altKey && event.keyCode === 76) {
            this.showLoginForm();
        }
    }

    componentDidMount() {
        document.onkeydown = this.watchForLoginHotkeys;
        this.validateToken();
    }

    render() {
        return (
            <div>
                <NavBar navFixed={ this.state.navFixed } navHrHidden={ true }/>
                <Waypoint onEnter={ this.unfixNav } />
                <hr id ="blog-hr"/>
                <Waypoint onEnter={ this.fixNav } bottomOffset="3000px"/>
                <Route exact path="/blog" component={ this.blogHome } />
                <Route path="/blog/articles/:slug" component={ ArticleView } />
                <Route path="/blog/admin/newPost" component={ () => <NewPost userIsAdmin={ this.state.userIsAdmin } token={ this.state.token }/> }/>
                { this.state.userIsAdmin ? <AdminToolbar /> : null }
                <Footer />
            </div>
        );
    }
}

export default Blog;