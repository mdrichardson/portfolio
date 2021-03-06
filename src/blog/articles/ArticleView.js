import React from 'react';
import './articleView.css';
import moment from 'moment';
import RelatedArticles from './RelatedArticles';
import CodeBlock from './CodeBlock';
import FourOhFour from '../../misc/FourOhFour';
import BlogApiService from '../BlogApiService';
import ReactGA from 'react-ga';

const ReactMarkdown = require('react-markdown');

class ArticleView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      article: {
        tags: [],
        token: ''
      }
    }
  }

    getArticle = async () => {
      try {
        const slug = this.props.match.params.slug;
        const token = this.props.token ? await this.props.token() : '';
        const url = this.props.isPreview ? `https://www.mdrichardson.net:3100/blog/admin/preview/${slug}` : `https://www.mdrichardson.net:3100/blog/articles/${slug}`
        const articleRespose = await fetch(url, {
          method: 'GET',
          headers: { 'x-access-token': token }
        });
        const article = await articleRespose.json();
        this.setArticle(article);
        ReactGA.pageview(`/blog/articles/${slug}`);
      } catch(err) {
        console.error(`Error fetching article: ${err}`);
      }
    }

    setArticle = (article) => {
      !this.isCancelled && this.setState({ article: article });
    }

    componentDidMount() {
      if (!this.isCancelled) {
        this.getArticle();
      }
    }

    componentWillUnmount() {
      this.isCancelled = true;
    }

    render() {
      if (this.state.article['error'] !== undefined) {
        return (
          <div id="article-error">
            <FourOhFour />
            <p>Error: { this.state.article.error.article }</p>
          </div>
        )
      } else {
        return (
          <div id="article-view">
            <div id="article" className="section-container">
              <div id="single-main-image">
                <img src={ BlogApiService.changeUrlIfOnGithub(this.state.article.image) } 
                  alt={ this.state.article.title } 
                  style={{ objectPosition: `${ this.state.article.imageXOffsetPercent }% ${ this.state.article.imageYOffsetPercent }%`}}>
                </img>
              </div>
              <div id="single-article-date">
                <div id="single-date-day">{ moment(this.state.article.createdAt).format('DD') }</div>
                <div id="single-date-month">{ moment(this.state.article.createdAt).format('MMM').toUpperCase() }</div>
                <div id="single-date-year">{ moment(this.state.article.createdAt).format('YYYY') }</div>
              </div>
              <div id="single-article-body">
                <h1 id="single-article-title">{ this.state.article.title }</h1>
                <ReactMarkdown source={ this.state.article.body } renderers={{ code: CodeBlock }} />
              </div>
              <div id="single-article-tags">
                { this.state.article.tags.map(tag => (
                  <p key={ `${this.state.article.id}-${tag}` } className="single-article-tag">{ tag }</p>
                ))}
              </div>
            </div>
            <div id="related">
              <RelatedArticles tags={ this.state.article.tags } currentArticle={ this.state.article._id } sectionTitle="related" />
            </div>
          </div>
        )
      }
    }
}

export default ArticleView;