import React from 'react';
import './ProjectList-Max.css';
import './ProjectList-Large.css';
import './ProjectList-Medium.css';
import './ProjectList-Small.css';
import ToolIcons from './ToolIcons';
import ProjectBullets from './ProjectBullets';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import ReactGA from 'react-ga';
import Waypoint from 'react-waypoint';

class ProjectsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expandedKey: 'temp', // Whether or not the project by that key name is currently expanded
            animated: {} // Map of which projects (by id/key) have had their entrance animation played
        }
    }

    // We need toggle for clicking (mobile user) and separate expand/collapse
    // so that clicking and then leaving doesn't mess things up if we only have toggle
    toggleExpand = (key) => this.setState({ expandedKey: this.state.expandedKey === key ? null : key})


    // Expand the project. Triggers CSS animations
    expandIt = (key) => {
      this.setState({ expandedKey: key })
      // Log expand in Google Analytics
      ReactGA.event({
        category: 'ProjectExpand',
        action: key
      });
    }

    // Collapse the project. Triggers CSS animations
    collapseIt = () => {
      this.setState({ expandedKey: null })
    }

    // Animate entrance of each project individually on first visibility
    animateEntrance = (key) => {
        let currentState = this.state;
        currentState.animated[key] = true;
        this.setState(currentState);
    }


    render() {
        return (
            this.props.list.map(proj => (
                <div key={proj.id} id={proj.id}
                    className={ `project-container ${ this.state.expandedKey === proj.id ? 'expanded' : '' } ${ this.state.animated[proj.id] ? 'enter' : 'leave' }` }
                    onClick={() => this.toggleExpand(proj.id)}>
                    <Waypoint onEnter={ () => this.animateEntrance(proj.id) } />
                    <div className="main-image">
                        <img src={proj.image} alt={proj.name}></img>
                    </div>
                    <h2>{ proj.name }</h2>
                    <div className="tool-icons">
                        <ToolIcons list={proj.tools} />
                    </div>                  
                    <div className="short-desc">
                        <p>{proj.short_desc}</p>
                    </div>
                    <div className="long-desc">
                        <p>{proj.long_desc}</p>
                    </div>
                    <ul className="bullets">
                        <ProjectBullets list={proj.bullets}/>
                    </ul>
                    <div className="links">
                        <div className="github-link">
                            <a href={proj.github} alt="Github link" target="_blank" rel="noopener noreferrer" className="small-text">
                                <FontAwesomeIcon icon={faGithub}  size="2x"/>
                                <span>Github Repo</span>
                            </a>
                        </div>
                        <div className="web-link" hidden={proj.url ? false : true}>
                            <a href={proj.url} alt="Project link" target="_blank" rel="noopener noreferrer" className="small-text">
                                <FontAwesomeIcon icon={faGlobe} size="2x"/>
                                <span>Website</span>
                            </a>
                        </div>
                    </div>
                    <p className="read-more small-text">read more</p>
                </div>
            ))
        )
    }
}
        

export default ProjectsList;