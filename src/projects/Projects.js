import React from 'react';
import './projects.css';
import ProjectList from './ProjectList';
import projectsTitle from '../images/projects.svg';
import TreatDispenser from './project-details/TreatDispenser';
import FUTpuppeteer from './project-details/FUTpuppeteer'
import Portfolio from './project-details/Portfolio'
import RESfilterer from './project-details/RESfilterer';

class Projects extends React.Component {

    state = {
        projects: [
            TreatDispenser,
            FUTpuppeteer,
            Portfolio,
            RESfilterer
        ]
    }

    render() {
        return (
            <div id="Projects">
                <div id="project-list">
                    <ProjectList list={this.state.projects} />
                </div>
                <div className="section-title">
                    <img src={ projectsTitle } alt="Projects" />
                </div>
            </div>
        );
    }
}

export default Projects;