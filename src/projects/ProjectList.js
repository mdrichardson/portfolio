import React from 'react';
import './ProjectList.css';
import ToolIcons from './ToolIcons';

const ProjectsList = (props) => (
    props.list.map(proj => (
        <div key={proj.id} className="project-container">
            <div className="text">
                <h2>{ proj.name }</h2>
                <div className="short-desc">
                    <p>{ proj.short_desc }</p>
                </div>
                <p className="read-more">read more</p>
            </div>
            <div className="main-image">
                <img src={proj.image} alt={proj.name}></img>
            </div>
            <div className="tool-icons">
                <ToolIcons list={proj.tools}/>
            </div>
        </div>
    ))
)
        

export default ProjectsList;