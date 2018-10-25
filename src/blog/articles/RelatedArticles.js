import React from 'react';
import relatedTitle from '../../images/related.svg';
import blogTitle from '../../images/blog.svg';
import { StickyContainer, Sticky } from 'react-sticky';
import ArticlesList from './ArticlesList';
import './articleView.css';
import BlogApiService from '../BlogApiService';
import LazyLoad from 'react-lazy-load';

const articlesToDisplay = 3;

class RelatedArticles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      activeTags: {},
      displayedArticles: [],
      sectionTitle: null
    }
  }

    setSectionTitle = () => {
      !this.isCancelled && this.setState({ sectionTitle: this.props.sectionTitle === 'blog' ? blogTitle : relatedTitle })
    }

    getArticles = async () => {
      const articles = await BlogApiService.getArticles();
      this.setArticles(await articles);
      this.loadAllArticlesIfNecessary();
    }

    setArticles = (articles) => {
      !this.isCancelled && this.setState({ articles: articles });
    }

    loadAllArticlesIfNecessary = () => {
      if (this.props.loadAll) {
        this.filterAndLimitArticles(['all']);
        !this.isCancelled && this.setState({ activeTags: {'all': true}})
      }
    }

    componentDidMount() {
      this.setSectionTitle();
      this.getArticles();
    }

    componentDidUpdate(prevProps) {
      if (this.props.tags !== prevProps.tags) {
        this.setTagsFromNewProps(this.props.tags);
        this.filterAndLimitArticles(this.props.tags);
      }
    }

    componentWillUnmount() {
      this.isCancelled = true;
    }

    setTagsFromNewProps = newTags => {
      newTags.forEach(tag => {
        let tempState = this.state;
        tempState.activeTags[tag] = true;
        this.setState(tempState);
      })
    }

    filterAndLimitArticles = (activeTags) => {
      let remainingArticles = articlesToDisplay;
      let articlesInCaseUnderLimit = [];
      this.state.articles.forEach(article => {
        if (remainingArticles > 0 && this.props.currentArticle !== article._id) {
          if (this.atLeastOneArticleTagMatchesActiveTags(article.tags, activeTags)) {
            this.addArticleToDisplayedArticles(article);
            remainingArticles--;
          } else {
            articlesInCaseUnderLimit.push(article)
          }
        }
      })
      // We always want to display articlesToDisplay, but we might not have enough relevant tags, so this should add the newest, that haven't been added and aren't related
      if (remainingArticles > 0 && articlesInCaseUnderLimit.length > 0) {
        articlesInCaseUnderLimit.forEach(article => {
          if (remainingArticles > 0 && this.props.currentArticle !== article._id) {
            this.addArticleToDisplayedArticles(article);
            this.setState({ activeTags: {'all' : true} })
            remainingArticles--;
          }
        })
      }
    }

    addArticleToDisplayedArticles = (article) => {
      const currentlyDisplayedArticles = this.state.displayedArticles;
      currentlyDisplayedArticles.push(article);
      this.setState({ displayedArticles: currentlyDisplayedArticles })
    }

    atLeastOneArticleTagMatchesActiveTags = (articleTags, activeTags) => {
      if (activeTags.includes('all')) {
        return true
      } else {
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
    }

    render() {
      if (this.state.articles.length === 0) {
        return (
          <p>Loading...</p>
        )
      } else {
        return (
          <StickyContainer>
            <LazyLoad offsetVertical={1500}>
              <div id="related-container" className="section-container">
                <div id="related-content" className="content-container">
                  <div id="related-articles-list">
                    <ArticlesList articles={ this.state.displayedArticles }  activeTags={ this.state.activeTags }/>
                  </div>
                  <a id="view-blog" href="/blog" className="hvr-underline-from-center hvr-grow">View Blog</a>
                </div>
                <div className="section-title">
                  <Sticky bottomOffset={130}>
                    {({ style, isSticky }) =>
                      <img style={ style } className={ isSticky ? "sticky" : "" } src={ this.state.sectionTitle } alt={ this.props.sectionTitle === 'blog' ? 'Blog' : 'Related' } />}
                  </Sticky>
                </div>
              </div>
            </LazyLoad>
          </StickyContainer>
        )
      }
    }
}

export default RelatedArticles;