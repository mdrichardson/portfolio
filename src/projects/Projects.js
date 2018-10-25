import React from 'react';
import './projects.css';
import ProjectList from './ProjectList';
import projectsTitle from '../images/projects.svg';
import TreatDispenser from './project-details/TreatDispenser';
import FUTpuppeteer from './project-details/FUTpuppeteer';
import Portfolio from './project-details/Portfolio';
import Blog from './project-details/Blog';
import RESfilterer from './project-details/RESfilterer';
import { StickyContainer, Sticky } from 'react-sticky';

class Projects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: []
    }
  }

  componentDidMount() {
    this.setState({
      projects: [
        Portfolio,
        Blog,
        TreatDispenser,
        FUTpuppeteer,
        RESfilterer
      ]
    })
  }
    
  render() {
    return (
      <StickyContainer>
        <div id="Projects" className="section-container">
          <div id="project-list" className="content-container">
            <ProjectList list={this.state.projects} />
          </div>
          <div className="section-title">
            <Sticky bottomOffset={130}>
              {({ style, isSticky }) =>
                <img style={ style } className={ isSticky ? "sticky" : "" } src={ projectsTitle } alt="Projects" />}
            </Sticky>
          </div>
        </div>
      </StickyContainer>
    );
  }
}

export default Projects;