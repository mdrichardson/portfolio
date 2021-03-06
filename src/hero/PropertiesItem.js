import React from 'react';
import { EasterEgg } from '../misc/EasterEgg';

class PropertiesItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '', // Track the value of the boolean input
                       easterEgg: [], // Track which EasterEggs are being triggered so we can pass them as props
                      }
    }

  componentDidMount() {
    this.setState({ value: this.props.value,
      easterEgg: this.props.egg })
  }

    handleChange = (event) => {
      event.preventDefault();
      // Don't let us make the value more than 5 characters (for 'false')
      if (event.target.value.length > 5) { return }
      this.setState({ value: event.target.value });
      // This dynamically adjusts input size. For some reason, it adds an extra 3 characters
      // The Math.max keeps the size attribute from going negative. Currently not necessary, but saving just in case
      // event.target.setAttribute('size', Math.max(1, event.target.value.length - 3));
    }

    // Allow easter egg trigger when pressing enter, as well as onBlur
    handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        this.easterEgg(event)
      }
    }

    easterEgg = (event) => {
      event.preventDefault();
      // Decide whether to trigger easter egg or set back to normal
      switch(event.target.value) {
      case 'false':
        EasterEgg.easterEggFalse(this.state.easterEgg);
        break;
      case 'true':
        EasterEgg.easterEggTrue(this.state.easterEgg);
        break;
      default:
        // Otherwise, reset value to true and do nothing
        this.setState({ value: 'true' });
      }
    }

    render() {
        return(
            <p>
                <label htmlFor={ this.props.name }>{ this.props.name }: 
                    <input type="text"
                    className="bool"
                    name={ this.props.name }
                    value={ this.state.value }
                    onChange={ this.handleChange }
                    onBlur={ this.easterEgg }
                    onKeyPress={ this.handleKeyPress }
                    />{ this.props.name !== 'great_to_work_with' ? ',' : ''} {/* Prevents comma on last item. Needs to change if property name changes */}
                </label>
            </p>
            )
        }
}

export default PropertiesItem