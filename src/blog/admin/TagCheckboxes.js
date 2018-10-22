import React from 'react';
import { FieldArray } from 'formik';

class TagCheckboxes extends React.Component {

    render() {
        return (
            <FieldArray
                name="tags"
                render={arrayHelpers => (
                    <div id="tags">
                        {this.props.values.allTags.map(tag => (
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
        )
    }
}

export default TagCheckboxes;