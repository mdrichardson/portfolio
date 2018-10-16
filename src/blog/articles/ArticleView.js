import React from 'react';

class ArticleView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    // TODO: Handle 404/no article
    // TODO: Display article info
    // TODO: style

    async componentDidMount() {
        // Fetch Article
        const slug = this.props.match.params.slug;
        const articleRespose = await fetch(`https://www.mdrichardson.net:3100/blog/articles/${slug}`);
        const article = await articleRespose.json();
        console.log(article);
    }

    render() {
        return (
            <p>Test</p>
        )
    }
}

export default ArticleView;