import React from 'react';
import relatedTitle from '../../images/related.svg';
import { StickyContainer, Sticky } from 'react-sticky';
import ArticlesList from './ArticlesList';

const maxArticles = 3;

class RelatedArticles extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            activeTags: {},
            displayedArticles: []
        }
    }

    async componentDidMount() {
        // Fetch Articles
        const articlesRespose = await fetch('https://www.mdrichardson.net:3100/blog/articles');
        const articles = await articlesRespose.json();
        this.setState({ articles: articles });
    }

    componentDidUpdate(prevProps) {
        if (this.props.tags !== prevProps.tags) {
            this.setTagsFromNewProps(this.props.tags);
            this.filterAndLimitArticles(this.props.tags);
        }
    }

    setTagsFromNewProps = newTags => {
        newTags.forEach(tag => {
            let tempState = this.state;
            tempState.activeTags[tag] = true;
            this.setState(tempState);
        })
    }

    filterAndLimitArticles = (activeTags) => {
        let remainingArticles = maxArticles;
        this.state.articles.forEach(article => {
            if (this.atLeastOneArticleTagMatchesActiveTags(article.tags, activeTags) && remainingArticles > 0 && this.props.currentArticle !== article._id) {
                console.log('match')
                const currentlyDisplayedArticles = this.state.displayedArticles;
                currentlyDisplayedArticles.push(article);
                this.setState({ displayedArticles: currentlyDisplayedArticles })
                remainingArticles--;
            }
        })
    }

    atLeastOneArticleTagMatchesActiveTags = (articleTags, activeTags) => {
        let haveMatch = false;
        articleTags.forEach(articleTag => {
            activeTags.forEach(activeTag => {
                if (articleTag === activeTag) {
                    haveMatch = true;
                    return true
                }
            })
        })
        return haveMatch
    }

    render() {
        return (
            <StickyContainer>
                <div id="related-container" className="section-container">
                    <div id="related-content">
                        <div id="related-articles-list">
                            <ArticlesList articles={ this.state.displayedArticles }  activeTags={ this.state.activeTags }/>
                        </div>
                        <button id="view-blog" className="hvr-underline-from-center hvr-grow">View Blog</button>
                    </div>
                    <div className="section-title">
                        <Sticky bottomOffset={130}>
                            {({ style, isSticky }) =>
                                <img style={ style } className={ isSticky ? "sticky" : "" } src={ relatedTitle } alt="Related" />}
                        </Sticky>
                    </div>
                </div>
            </StickyContainer>
        )
    }
}

export default RelatedArticles;