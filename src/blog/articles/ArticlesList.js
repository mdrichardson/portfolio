import React from 'react';
import moment from 'moment';

const characterLimit = 300;

class ArticlesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    shortenBodyIfNecessary = (body) => {
        let outputBody = '';
        if (body.length > characterLimit) {
            outputBody = `${ body.substring(0, characterLimit) } ...`
        } else {
            outputBody = body;
        }
        return outputBody;
    }

    articleIsShown = (articleTags) => {
        if (this.props.activeTags.indexOf('all') > -1) {
            return true
        } else {
            var isShown = false;
            articleTags.forEach(tag => {
            if (this.props.activeTags.indexOf(tag) > -1) {
                isShown = true;
            }
            })
            return isShown;
        }
    }

    render() {
        if (!this.props.articles) {
            return (<div id="articles-loading">Loading...</div>)
        } else {
            return (
                this.props.articles.map(article => {
                    if (this.articleIsShown(article.tags)) {
                        return (
                            <div key={ article._id }
                            id={ article._id }
                            className="article-container">
                                <div className="main-image">
                                    <img src={ article.imageUrl } alt={ article.title } style={{ objectPosition: `${ article.imageXOffsetPercent }% ${ article.imageYOffsetPercent }%`}}></img>
                                </div>
                                <div className="article-date">
                                    <div className="date-day">{ moment(article.createdAt).format('DD') }</div>
                                    <div className="date-month">{ moment(article.createdAt).format('MMM').toUpperCase() }</div>
                                    <div className="date-year">{ moment(article.createdAt).format('YYYY') }</div>
                                </div>
                                <h2>{ article.title }</h2>
                                <p className="article-body">{ this.shortenBodyIfNecessary(article.body) }</p>
                                <p className="article-read-more">read more </p>
                                <div className="article-tags">
                                    { article.tags.map(tag => (
                                        <p key={ `${article.id}-${tag}` } className="article-tag small-text">{ tag }</p>
                                    ))}
                                </div>
                            </div>
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