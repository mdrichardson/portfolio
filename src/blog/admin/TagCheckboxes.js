import React from 'react';
import { FieldArray } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import BlogApiService from '../BlogApiService';

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
        await BlogApiService.addNewTag(this.state.newTag, this.props.values.token);
        this.getTags();
        this.setState({ newTag: '' });
    }

    getTags = async () => {
        const tags = await BlogApiService.getTags();
        this.setTags(await tags);
    }

    setTags = (tags) => {
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