import React from 'react';
import createHistory from "history/createBrowserHistory";
import './articleView.css';
import moment from 'moment';

const history = createHistory();

class ArticleView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            article: {
                tags: []
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

    // TODO: Handle 404/no article
    // TODO: Display article info
    // TODO: style

    async componentDidMount() {
        // Fetch Article
        const slug = this.props.match.params.slug;
        const articleRespose = await fetch(`https://www.mdrichardson.net:3100/blog/articles/${slug}`);
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
                <div id="article-view" className="section-container">
                    <div id="article">
                        <div id="main-image">
                            <img src={ this.state.article.imageUrl } alt={ this.state.article.title } style={{ objectPosition: `${ this.state.article.imageXOffsetPercent }% ${ this.state.article.imageYOffsetPercent }%`}}></img>
                        </div>
                        <div id="article-date">
                            <div id="date-day">{ moment(this.state.article.createdAt).format('DD') }</div>
                            <div id="date-month">{ moment(this.state.article.createdAt).format('MMM').toUpperCase() }</div>
                            <div id="date-year">{ moment(this.state.article.createdAt).format('YYYY') }</div>
                        </div>
                        <h2>{ this.state.article.title }</h2>
                        <p id="article-body">{ this.state.article.body }</p>
                        <div id="article-tags">
                            { this.state.article.tags.map(tag => (
                                <p key={ `${this.state.article.id}-${tag}` } className="article-tag small-text">{ tag }</p>
                            ))}
                        </div>
                    </div>
                    <div id="related">
                    </div>
                </div>
            )
        }
    }
}

export default ArticleView;