import React from 'react';
import './hero.css';
// import bracketSVG from '../images/bracket.svg';
import PropertiesList from './PropertiesList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';

// React doesn't allow you to import SVG files directly (forces as img), so we have to copy the code inside the SVG and use it here.
// Convert to valid JSX at https://svg2jsx.herokuapp.com/
// const bracketSVG = (<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 58.146 300'>
//     <defs>
//         <linearGradient id='lgrad' x1='100%' y1='100%' x2='0%' y2='0%'>
//             <stop offset='0%' stopColor='#fcab10' />
//             <stop offset='100%' stopColor='#f71735' />
//         </linearGradient>
//     </defs>
//     <path fill='url(#lgrad)' className='a' d='M52,10.156q-12.027,0-18.514-12.1T27-35.889V-92.62q0-18.387-4.972-27.423a18.1,18.1,0,0,0-15.389-9.822v-19.958a17.779,17.779,0,0,0,15.341-9.665Q27-168.524,27-186.91V-243.8q0-22.158,6.3-34.1T52-289.844H64.786v20.272H58.82q-8.618,0-12.264,8.408t-3.646,25.38v55.946q0,14.772-5.019,25.537T24.539-140.237v.314q8.428,3.3,13.4,13.986t4.972,25.93v56.1q0,16.658,3.646,25.223T58.82-10.116h5.966V10.156Z'
//     transform='translate(-6.641 289.844)' />
// </svg>)

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
                <div id="Hero">
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