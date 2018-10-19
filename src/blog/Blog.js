import React from 'react';
import './blog.css';
import LoginForm from './admin/LoginForm';
import NavBar from '../nav/NavBar';
import blogTitle from '../images/blog.svg';
import Articles from './articles/Articles';
import ArticleView from './articles/ArticleView';
import Footer from '../footer/Footer';
import { StickyContainer, Sticky } from 'react-sticky';
import { Route } from 'react-router-dom';


const blogHome = () => {

    const showLoginForm = () => {
        const loginForm = document.getElementById('blog-login-container');
        loginForm.style.display = 'block';
    }

    const hideLoginForm = () => {
        const loginForm = document.getElementById('blog-login-container');
        loginForm.style.display = 'none';
    }

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
            <div id="login" onMouseLeave={ hideLoginForm }>
                <p id="login-text" onClick={ showLoginForm }>Login</p>
                <LoginForm />
            </div>
        </StickyContainer>
    )
}

class Blog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div>
                <NavBar navFixed={ true } navHrHidden={ true }/>
                <hr id ="blog-hr"/>
                <Route exact path="/blog" component={ blogHome } />
                <Route path="/blog/articles/:slug" component={ ArticleView } />
                <Footer />
            </div>
        );
    }
}

export default Blog;