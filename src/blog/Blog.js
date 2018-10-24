import React from 'react';
import './blog.css';
import LoginForm from './admin/LoginForm';
import NavBar from '../nav/NavBar';
import blogTitle from '../images/blog.svg';
import Articles from './articles/Articles';
import ArticleView from './articles/ArticleView';
import EditPost from './admin/EditPost';
import AdminToolbar from './admin/AdminToolbar';
import Footer from '../footer/Footer';
import { StickyContainer, Sticky } from 'react-sticky';
import { Route } from 'react-router-dom';

class Blog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userIsAdmin: false,
            navFixed: false,
            token: ''
        }
    }

    blogHome = () => {
    
        return (
            <StickyContainer>
                <div id="blog" className="section-container">
                    <Articles userIsAdmin={ this.state.userIsAdmin } token={ this.state.token }/>
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
                    this.state.userIsAdmin !== true && this.setState({ userIsAdmin: true });
                    this.state.token !== token && this.setState({ token: token });
                    return token
                }
            } catch(err) {
                console.error(`Error validating token: ${err}`);
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
        !this.isCancelled && this.validateToken();
    }

    componentWillUnmount() {
        this.isCancelled = true;
    }

    render() {
        return (
            <div>
                <NavBar navFixed={ true } navHrHidden={ true }/>
                <hr id ="blog-hr"/>
                <Route exact path="/blog" component={ this.blogHome } />
                <Route path="/blog/articles/:slug" component={ ArticleView } />
                <Route path="/blog/admin/preview/:slug" component={ (props) => <ArticleView isPreview= { true } token={ this.validateToken.bind(this) } {...props}/>} />
                <Route path="/blog/admin/newPost" component={ (props) => <EditPost userIsAdmin={ this.state.userIsAdmin } token={ this.state.token } {...props}/> }/>
                <Route path="/blog/admin/edit/:slug" component={ (props) => <EditPost userIsAdmin={ this.state.userIsAdmin } token={ this.state.token } {...props}/>}/>
                { this.state.userIsAdmin ? <AdminToolbar /> : null }
                <Footer />
            </div>
        );
    }
}

export default Blog;