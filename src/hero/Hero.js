import React from 'react';
import './hero.css';
import PropertiesList from './PropertiesList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';


class Hero extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      properties: []
    }
  }

    // The easterEgg property is a list what category the easterEgg affects
    componentDidMount() {
        this.setState({
            properties: [
                { name: 'full_stack_dev', value: 'true', id: 'full_stack', easterEggs: ['console', 'dynamic_items']},
                { name: 'dynamic_skillset', value: 'true', id: 'skillset', easterEggs: ['ui']},
                { name: 'great_to_work_with', value: 'true', id: 'work', easterEggs: ['scroll']},
            ]
        })
    }

  render() {
    return (
      <div>
        <div id="Home">
          <div id="hero-name">
            <p>Michael Richardson <span>=</span></p>
          </div>
          <div id="bracket-container">
            <div className="bracket" id="left-bracket"></div>
            <div id="hero-properties">
              <PropertiesList list={this.state.properties} />
            </div>
            <div className="bracket flip-h" id="right-bracket"></div>
          </div>
        </div>
        <pre><style id="ui-block"></style></pre>
        <div id="down-arrow" className={ this.props.hideArrow ? "hidden" : "" }>
          <FontAwesomeIcon icon={faSortDown} size="6x"/>
        </div>
      </div>
    );
  }
}

export default Hero;