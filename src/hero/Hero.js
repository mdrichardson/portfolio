import React from 'react';
import './hero.css';
import bracketSVG from '../images/bracket.svg';
import PropertiesList from './PropertiesList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';


class Hero extends React.Component {

    state = {
        properties: [
            { name: 'full_stack_dev', value: 'true', id: 'full_stack'},
            { name: 'makes_pretty_ui', value: 'true', id: 'ui'},
            { name: 'easy_to_work_with', value: 'true', id: 'work'},
        ]
    }

    render() {
        return (
            <div>
                <div id="Hero">
                    <div id="hero-name" className="hide-mobile">
                        <p>Michael Richardson <span>=</span></p>
                    </div>
                    <div id="bracket-container">
                        <div className="bracket">
                            <div><img src={ bracketSVG } alt="left_bracket" /></div>
                        </div>
                        <div id="hero-properties">
                            <PropertiesList list={this.state.properties} />
                        </div>
                        <div className="bracket">
                            <div><img src={ bracketSVG } alt="right_bracket" className="flip-h" /></div>
                        </div>
                    </div>
                </div>
                <div id="down-arrow">
                    <FontAwesomeIcon icon={faSortDown} size="6x" />
                </div>
            </div>
        );
    }
}

export default Hero;