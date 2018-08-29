import React from 'react';

class PropertiesItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '' }
    }

    componentDidMount() {
        this.setState({ value: this.props.value })
    }

    handleChange = (event) => {
        event.preventDefault();
        // Don't let us make the value more than 5 characters (for 'false')
        if (event.target.value.length > 5) { return }
        this.setState({ value: event.target.value });
        // This dynamically adjusts input size. For some reason, it adds an extra 3 characters
        // The Math.max keeps the size attribute from going negative
        event.target.setAttribute('size', Math.max(1, event.target.value.length - 3));
    }

    easterEgg = (event) => {
        event.preventDefault();
        // If value isn't 'false', reset it to true and return
        if (event.target.value !== 'false') {
            this.setState({ value: 'true' });
            return
        }
        // Otherwise, trigger the easter eggs
        console.log('egg')
    }

    render() {
        return(
            <p>{this.props.name}:{' '}  
                <input type="text"
                className="bool"
                name={ this.props.name }
                value={ this.state.value }
                onChange={ this.handleChange }
                onBlur={ this.easterEgg }
                size="1" />,{/* Comma is necessary */}
            </p>
            )
        }
}

export default PropertiesItem