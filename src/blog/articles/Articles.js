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
            activeTags: {},
            userIsAdmin: false,
            token: ''
        }
    }

    toggleFilter = (tag) => {
        const tempState = this.state;
        tempState.activeTags[tag] = !tempState.activeTags[tag];
        this.setState(tempState);
    }

    getTags = async () => {
        const tagsResponse = await fetch('https://www.mdrichardson.net:3100/blog/tags');
        const tags = await tagsResponse.json();
        return this.setTags(tags);
    }

    setTags = (tags) => {
        this.setState( { tags: tags });
        tags.forEach(tag => {
            let tempState = this.state;
            tempState.activeTags[tag] = true;
            this.setState(tempState);
        })
    }

    getArticles = async () => {
        const articlesRespose = await fetch('https://www.mdrichardson.net:3100/blog/articles');
        const articles = await articlesRespose.json();
        this.setArticles(articles);
    }

    setArticles = (articles) => {
        const allArticles = [...this.state.articles, ...articles];
        this.setState( { articles: allArticles });
    }

    getUnPublishedArticles = async (token) => {
        if (!this.isCancelled) {
            // State is set asynchronously and too slowly to use this.state.token, so we need to pass it in from newProps in componentWillReceiveProps
            const previewResponse = await fetch('https://www.mdrichardson.net:3100/blog/admin/unpublished', {
                headers: { 'x-access-token': token },
            });
            const unpublishedArticles = await previewResponse.json();
            this.setUnpublishedArticles(unpublishedArticles);
        }
    }

    setUnpublishedArticles = async (unpublishedArticles) => {
        const allArticles = [...this.state.articles, ...unpublishedArticles];
        this.setState( { articles: allArticles });
    }

    componentDidMount() {
        this.getTags();
        this.getArticles();
        if (!this.isCancelled && this.props.userIsAdmin && this.props.token !== '') {
            this.getUnPublishedArticles(this.props.token);
        }
    }

    componentWillReceiveProps(newProps) {
        if (newProps.userIsAdmin !== this.props.userIsAdmin) {
            this.setState({ userIsAdmin: newProps.userIsAdmin });
        }
        if (newProps.token !== this.props.token) {
            this.setState({ token: newProps.token });
        }
        if (this.state.userIsAdmin && newProps.token !== '') {
            this.getUnPublishedArticles(newProps.token);
            this.isCancelled = true;
        }
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