import React from 'react';
import './articles.css';
import ArticlesFilter from './ArticlesFilter';
import ArticlesList from './ArticlesList';
import BlogApiService from '../BlogApiService';

class Articles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      tags: [],
      activeTags: {},
      userIsAdmin: false,
      token: '',
      blogIsUp: false
    }
  }

    toggleFilter = (tag) => {
      const tempState = this.state;
      tempState.activeTags[tag] = !tempState.activeTags[tag];
      this.setState(tempState);
    }

    getTags = async () => {
      const tags = await BlogApiService.getTags();
      this.setTags(tags);
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
      const articles = await BlogApiService.getArticles();
      this.setArticles(articles);
    }

    setArticles = (articles) => {
      const allArticles = [...this.state.articles, ...articles];
      this.setState( { articles: allArticles });
    }

    // State is set asynchronously and too slowly to use this.state.token, so we need to pass it in from newProps in componentWillReceiveProps
    getUnPublishedArticles = async (token) => {
      if (!this.isCancelled) {
        const unpublishedArticles = await BlogApiService.getUnpublishedArticles(token);
        this.setUnpublishedArticles(unpublishedArticles);
      }
    }

    setUnpublishedArticles = async (unpublishedArticles) => {
      const allArticles = [...this.state.articles, ...unpublishedArticles];
      this.setState( { articles: allArticles });
    }

    componentDidMount() {
      BlogApiService.blogIsUp().then((result) => this.setState({ blogIsUp: result }));
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
      if (this.state.userIsAdmin && newProps.token !== '' && this.state.blogIsUp) {
        this.getUnPublishedArticles(newProps.token);
        this.isCancelled = true;
      }
    }

    render() {
      if (!this.state.blogIsUp) return null;
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