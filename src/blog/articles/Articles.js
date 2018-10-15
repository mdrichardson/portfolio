import React from 'react';
import './articles.css';
import ArticlesFilter from './ArticlesFilter';
import ArticlesList from './ArticlesList';

class Articles extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            tags: [],
            activeTags: []
        }
    }

    toggleFilter = (tag) => {
        const tagIndex = this.state.activeTags.indexOf(tag);
        let newTags = this.state.activeTags;
        if ( tagIndex > -1 ) {
            newTags.splice(tagIndex, 1);
        } else {
            newTags = [...newTags, tag]
        }
        this.setState({ activeTags: newTags });
    }

    async componentDidMount() {
        // Fetch Tags
        const tagsRespose = await fetch('https://www.mdrichardson.net:3100/blog/tags');
        const tags = await tagsRespose.json();
        this.setState( { tags: tags });
        this.setState({ activeTags: [...this.state.tags] });
        // Fetch Articles
        const articlesRespose = await fetch('https://www.mdrichardson.net:3100/blog/articles');
        const articles = await articlesRespose.json();
        this.setState( { articles: articles });
    }

    render() {
        return (
            <div>
                <div id="articles-filter">
                    {/* We need to bind this to toggleFilter so that we can pass the argument from the child tag element to this Articles class object */}
                    <ArticlesFilter tags={ this.state.tags } activeTags={ this.state.activeTags } onClick={ this.toggleFilter.bind(this) }/>
                </div>
                <div id="articles-list">
                    <ArticlesList articles={ this.state.articles } activeTags={ this.state.activeTags }/>
                </div>
            </div>
        );
    }
}

export default Articles;