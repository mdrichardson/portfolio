import React from 'react';
import './skills.css';
import skillsTitle from '../images/skills.svg';
import SkillsList from './SkillsList';
import { StickyContainer, Sticky } from 'react-sticky';

class Skills extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      skills: {
        languages :{
          title: '',
          items: []
        },
        tools: {
          title: '',
          items: []
        },
        databases: {
          title: '',
          items: []
        }
      }
    }
  }

  componentDidMount() {
    this.setState({
      skills: {
        languages: {
          title: 'Languages',
          items: [
            'JavaScript/TypeScript',
            'C#',
            'Python',
          ]
        },
        tools: {
          title: 'Tools',
          items: [
            'Docker',
            'Node.js',
            'Angular',
            'React',
            'Express',
            'Selenium',
            'Wordpress',
            'Bot Framework',
            'AWS',
            'Azure',
            'Git',
            'Linux'
          ]
        },
        databases: {
          title: 'Databases',
          items: [
            'CosmosDB',
            'MongoDB',
            'SQLite',
            'PostgreSQL'
          ]
        }
      }
    })
  }

    render() {
        // StickyContainer makes it so section heading follows the section. bottomOffset of 150 keeps if from following down too far
        return (
            <StickyContainer>
                <div id="Skills" className="section-container">
                    <div className="section-title">
                        <Sticky bottomOffset={150}>
                            {({ style, isSticky }) =>
                                <img style={ style } className={ isSticky ? "sticky" : "" } src={ skillsTitle } alt="Skills" />}
                        </Sticky>
                    </div>
                    <div id="skills-columns" className="content-container">
                        <SkillsList list={this.state.skills.languages} />
                        <SkillsList list={this.state.skills.tools} />
                        <SkillsList list={this.state.skills.databases} />
                    </div>
                </div>
            </StickyContainer>
        );
    }
}

export default Skills;