import React from 'react';
import moment from 'moment';
import Waypoint from 'react-waypoint';

const characterLimit = 250;

class ArticlesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            animated: {} // Map of which articles (by id/key) have had their entrance animation played
        }
    }

    shortenSummaryIfNecessary = (summary) => {
        let outputSummary = '';
        if (summary.length > characterLimit) {
            outputSummary = `${ summary.substring(0, characterLimit) } ...`
        } else {
            outputSummary = summary;
        }
        return outputSummary;
    }

    articleIsShown = (articleTags) => {
        if (this.props.activeTags['all']) {
            return true
        } else {
            var isShown = false;
            articleTags.forEach(tag => {
            if (this.props.activeTags[tag]) {
                isShown = true;
            }
            })
            return isShown;
        }
    }

    // Animate entrance of each project individually on first visibility
    animateEntrance = (key) => {
        let currentState = this.state;
        currentState.animated[key] = true;
        this.setState(currentState);
    }

    render() {
        if (!this.props.articles) {
            return (<div id="articles-loading">Loading...</div>)
        } else {
            return (
                this.props.articles.map(article => {
                    if (this.articleIsShown(article.tags)) {
                        return (
                            <a key={ article._id }
                            id={ article._id }
                            className={ `article-container hvr-grow ${ this.state.animated[article._id] ? 'enter' : '' }` }
                            href={ `/blog/articles/${article.slug}` }>
                                <Waypoint onEnter={ () => this.animateEntrance(article._id) } bottomOffset="-22%"/> {/* bottomOffset is negative because waypoint needs to trigger when any part of article visible */ }
                                <div className="main-image">
                                    <img src={ article.image } alt={ article.title } style={{ objectPosition: `${ article.imageXOffsetPercent }% ${ article.imageYOffsetPercent }%`}}></img>
                                </div>
                                <div className="article-date">
                                    <div className="date-day">{ moment(article.createdAt).format('DD') }</div>
                                    <div className="date-month">{ moment(article.createdAt).format('MMM').toUpperCase() }</div>
                                    <div className="date-year">{ moment(article.createdAt).format('YYYY') }</div>
                                </div>
                                <h2>{ article.title }</h2>
                                <p className="article-summary">{ this.shortenSummaryIfNecessary(article.summary) }</p>
                                <p className="article-read-more">read more </p>
                                <div className="article-tags">
                                    { article.tags.map(tag => (
                                        <p key={ `${article.id}-${tag}` } className="article-tag small-text">{ tag }</p>
                                    ))}
                                </div>
                            </a>
                        )
                    } else {
                        return null
                    }
                })
            );
        }
    }
}

export default ArticlesList;