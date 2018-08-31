import React from 'react';
import './ProjectList.css';
import ToolIcons from './ToolIcons';
import ProjectBullets from './ProjectBullets';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons'
class ProjectsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expandedKey: 'temp'
        }
    }

    // We need toggle for clicking (mobile user) and separate expand/collapse
    // so that clicking and then leaving doesn't mess things up if we only have toggle
    toggleExpand = (key) => this.setState({ expandedKey: this.state.expandedKey === key ? null : key})

    expandIt = (key) => this.setState({ expandedKey: key })

    collapseIt = () => this.setState({ expandedKey: null })

    render() {
        return (
            this.props.list.map(proj => (
                <div key={proj.id} id={proj.id}
                    className={`project-container ${this.state.expandedKey === proj.id ? 'expanded': ''}`}
                    onMouseEnter={() => this.expandIt(proj.id)} onMouseLeave={() => this.collapseIt(proj.id)}>
                    <div className="text">
                        <h2>{proj.name }</h2>
                        <div className="short-desc">
                            <p>{proj.short_desc}</p>
                        </div>
                        <ul className="bullets">
                            <ProjectBullets list={proj.bullets}/>
                        </ul>
                        <div className="long-desc">
                            <p>{proj.long_desc}</p>
                        </div>
                    </div>
                    <div className="main-image" onClick={() => this.toggleExpand(proj.id)}>
                        <img src={proj.image} alt={proj.name}></img>
                        {/* We need to duplicate the tool icons so creating the expanded layout is easier */}
                        <div className="expanded-tool-icons">
                            <ToolIcons list={proj.tools} />
                        </div>
                        <div className="links">
                            <div className="github-link">
                                <a href={proj.github} alt="Github link" target="_blank">
                                    <FontAwesomeIcon icon={faGithub} />
                                    <span>Github Repo</span>
                                </a>
                            </div>
                            <div className="web-link" hidden={proj.url ? false : true}>
                                <a href={proj.url} alt="Project link" target="_blank">
                                    <FontAwesomeIcon icon={faGlobe} />
                                    <span>Website</span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="tool-icons">
                        <ToolIcons list={proj.tools} />
                    </div>
                </div>
            ))
        )
    }
}
        

export default ProjectsList;