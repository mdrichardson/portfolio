import React from 'react';
import Waypoint from 'react-waypoint';

class SkillsList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            entranceAnimation: false // Whether or not the entrance animation has been played
        }
    }

    // Change the state, and therefore the class of the elements that need entrance animations
    animateEntrance = ()  => {
        this.setState({ entranceAnimation: true })
    }

    render() {
        // Databases is the last one and we need to add a statement after it. I want it to always be the same width as and to move
        //  with the databases list, so it needs to go here
        // Waypoints are used to trigger entrance animations
        if (this.props.list.title === 'Databases') {
            return (
                <div id={this.props.list.title.toLowerCase()} className={ this.state.entranceAnimation ? 'animated' : '' }>
                    <Waypoint onEnter={ () => this.animateEntrance() } />
                    <div>
                        <h3>{this.props.list.title}</h3>
                        <ul>
                            {this.props.list.items.map((item, index) => (
                                <li key={index} className="skillsItem">{item}</li>
                            ))}
                        </ul>
                    </div>
                    <div id="skills-statement">
                        <p className="statement">Everything needed to build beautiful, efficient, full-stack web apps and software.</p>
                    </div>
                </div>
            )
        } return (
            <div id={this.props.list.title.toLowerCase()} className={ this.state.entranceAnimation ? 'animated' : '' }>
                <Waypoint onEnter={ () => this.animateEntrance() } />
                <h3>{this.props.list.title}</h3>
                <ul>
                    {this.props.list.items.map((item, index) => (
                        <li key={index} className="skillsItem">{item}</li>
                    ))}
                </ul>
            </div>
        )
    }
}
    
    

        

export default SkillsList;