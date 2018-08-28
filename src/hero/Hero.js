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

    componentDidMount() {
        this.setState({
            properties: [
                { name: 'full_stack_dev', value: 'true', id: 'full_stack'},
                { name: 'makes_pretty_ui', value: 'true', id: 'ui'},
                { name: 'easy_to_work_with', value: 'true', id: 'work'},
            ]
        })
    }

    render() {
        return (
            <div>
                <div id="Home">
                    <div id="hero-name" className="hide-mobile">
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
                <div id="down-arrow" className={ this.props.hideArrow ? "hidden" : "" }>
                    <FontAwesomeIcon icon={faSortDown} size="6x"/>
                </div>
            </div>
        );
    }
}

export default Hero;