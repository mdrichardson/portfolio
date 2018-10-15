import React from 'react';
import './blog.css';
import NavBar from '../nav/NavBar';
import blogTitle from '../images/blog.svg';
import Articles from './articles/Articles';
import Footer from '../footer/Footer';
import { StickyContainer, Sticky } from 'react-sticky';

class Blog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div>
                <NavBar navFixed={ true } />
                <hr id ="blog-hr"/>
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
                </StickyContainer>
                <Footer />
            </div>
        );
    }
}

export default Blog;