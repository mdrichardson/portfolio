import React from 'react';
import { FieldArray } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';

class TagCheckboxes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newTag: '',
            tags: []
        }
    }

    handleInputChange = (event) => {
        event.preventDefault();
        this.setState({ newTag: event.target.value });
    }

    addTag = async (event) => {
        event.preventDefault();
        try {
            const res = await fetch('https://www.mdrichardson.net:3100/blog/admin/tags', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: this.state.newTag,
                    token: this.props.values.token
                })
            })
            const status = await res.status;
            if (status === 200) {
                console.log('Tag added successfully');
                this.getTags();
                this.setState({ newTag: '' });
            }
        } catch(err) {
            console.error(err);
        }
    }

    getTags = async () => {
        const tagsResponse = await fetch('https://www.mdrichardson.net:3100/blog/tags');
        const tags = await tagsResponse.json();
        this.setState({ tags: tags })
    }

    componentDidMount() {
        this.setState({ tags: this.props.values.allTags })
    }

    render() {
        return (
            <div>
                <FieldArray
                    name="tags"
                    render={arrayHelpers => (
                        <div id="tags">
                            {this.state.tags.map(tag => (
                                <div key={tag} className="tag">
                                    <label htmlFor={tag}>
                                        <input type="checkbox"
                                            name={tag} 
                                            value={tag}
                                            checked={this.props.values.tags.includes(tag)}
                                            onChange={e => {
                                                if (e.target.checked) arrayHelpers.push(tag);
                                                else {
                                                    const index = this.props.values.tags.indexOf(tag);
                                                    arrayHelpers.remove(index);
                                                }
                                            }}
                                                />
                                    {tag}</label>
                                </div>
                            ))}
                        </div>
                    )}>
                </FieldArray>
                <div id="new-tag">
                    <label htmlFor="new-tag">New Tag:&nbsp;
                        <input type="text" name="new-tag" onChange={ this.handleInputChange }/>
                    </label>
                    <FontAwesomeIcon icon={faPlusSquare} onClick={ this.addTag }/>
                </div>
            </div>
        )
    }
}

export default TagCheckboxes;