import React from 'react';
import './articles.css';
import ArticlesFilter from './ArticlesFilter';
import ArticlesList from './ArticlesList';

class Articles extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div>
                <ArticlesFilter />
                <ArticlesList />
            </div>
        );
    }
}

export default Articles;