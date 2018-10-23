import React from 'react';
import createHistory from "history/createBrowserHistory";
import './articleView.css';
import moment from 'moment';
import RelatedArticles from './RelatedArticles';

const ReactMarkdown = require('react-markdown');

const history = createHistory();

class ArticleView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            article: {
                tags: [],
                token: ''
            },
            redirectTimeLeft: 5
        }
    }

    redirectToBlog = () => {
        let countdown = setInterval(() => {
            this.setState({ redirectTimeLeft: this.state.redirectTimeLeft - 1 })
            if (this.state.redirectTimeLeft <= 0) {
                clearInterval(countdown);
                history.goBack();
            }
        }, 1000)
    }

    async componentDidMount() {
        // Fetch Article
        const slug = this.props.match.params.slug;
        const token = await this.props.token();
        const url = this.props.isPreview ? `https://www.mdrichardson.net:3100/blog/admin/preview/${slug}` : `https://www.mdrichardson.net:3100/blog/articles/${slug}`
        const articleRespose = await fetch(url, {
            method: 'GET',
            headers: { 'x-access-token': token }
        });
        const article = await articleRespose.json();
        this.setState({ article: article });
        if (this.state.article['error'] !== undefined) {
            this.redirectToBlog();
        }
    }

    render() {
        if (this.state.article['error'] !== undefined) {
            return (
                <div id="article-error">
                    <p>Error: { this.state.article.error.article }</p>
                    <p>Redirecting in { this.state.redirectTimeLeft }s</p>
                </div>
            )
        } else {
            return (
                <div id="article-view">
                    <div id="article" className="section-container">
                        <div id="single-main-image">
                            <img src={ this.state.article.image } alt={ this.state.article.title } style={{ objectPosition: `${ this.state.article.imageXOffsetPercent }% ${ this.state.article.imageYOffsetPercent }%`}}></img>
                        </div>
                        <div id="single-article-date">
                            <div id="single-date-day">{ moment(this.state.article.createdAt).format('DD') }</div>
                            <div id="single-date-month">{ moment(this.state.article.createdAt).format('MMM').toUpperCase() }</div>
                            <div id="single-date-year">{ moment(this.state.article.createdAt).format('YYYY') }</div>
                        </div>
                        <h1>{ this.state.article.title }</h1>
                        <div id="single-article-body"><ReactMarkdown source={ this.state.article.body } /></div>
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