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
                    <h2>Filter Articles: </h2>
                    <div id="tags">
                        {
                            this.props.tags.map(tag => ( 
                                <p key={ tag } className={`tag ${this.props.activeTags.indexOf(tag) > -1 ? 'active' : ''}`} onClick={() => this.props.onClick(tag)}>{ tag }</p>
                            ))
                        }
                    </div>
                </div>
                );
            }
    }
}

export default ArticlesFilter;