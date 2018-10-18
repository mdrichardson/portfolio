import React from 'react';

class ArticlesFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        if (!this.props.tags) {
            return (<div id="tags-loading">Loading...</div>)
        } else {
            return (
                <div id="articles-filter">
                    <h2>Filter Articles:</h2>
                    <div id="tags">
                        {
                            this.props.tags.map(tag => ( 
                                <button key={ tag } className={`tag ${this.props.activeTags[tag] ? 'active' : ''}`} onClick={() => this.props.onClick(tag)}>{ tag }</button>
                            ))
                        }
                    </div>
                </div>
                );
            }
    }
}

export default ArticlesFilter;