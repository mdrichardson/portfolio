import React from 'react';
import './ProjectList.css';
import ToolIcons from './ToolIcons';

const ProjectsList = (props) => (
    props.list.map(proj => (
        <div key={proj.id} className="project-container">
            <div className="text">
                <div className="short-desc">
                    { proj.short_desc }
                </div>
                <p className="read-more">read more</p>
            </div>
            <div className="main-image">
                <img src={proj.image}></img>
            </div>
            <div className="tool-icons">
                <ToolIcons list={proj.tools}/>
            </div>
        </div>
    ))
)
        

export default ProjectsList;