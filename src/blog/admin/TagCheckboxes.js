import React from 'react';
import { FieldArray } from 'formik';

class TagCheckboxes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }


    render() {
        if (this.state.tags === []) return null
        return (
            <FieldArray
                name="tags"
                render={arrayHelpers => (
                    <div>
                        {this.props.values.allTags.map(tag => (
                            <div key={tag}>
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
                                <label htmlFor={tag}>{tag}</label>
                            </div>
                        ))}
                    </div>
                )}>
            </FieldArray>
        )
    }
}

export default TagCheckboxes;