import React from 'react';
import './blog.css';
import NavBar from '../nav/NavBar';

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
                <div id="blog" className="section-container">
                    <p>TEST</p>
                </div>
            </div>
        );
    }
}

export default Blog;