import React from 'react';
import './projects.css';
import ProjectsList from './ProjectsList';
import projectsTitle from '../images/projects.svg'

const Projects = () => {
    return (
        <div id="Projects">
            <ProjectsList />
            <div className="section-title">
                <img src={ projectsTitle } alt="Projects" />
            </div>
        </div>
    );
}

export default Projects;