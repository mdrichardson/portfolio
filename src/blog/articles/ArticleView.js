import React from 'react';
import createHistory from "history/createBrowserHistory"

const history = createHistory();

class ArticleView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            article: {},
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
                <p>Test</p>
            )
        }
    }
}

export default ArticleView;