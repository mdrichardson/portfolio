import React from 'react';
import './skills.css';
import skillsTitle from '../images/skills.svg'
import SkillsList from './SkillsList'

class Skills extends React.Component {

    state = {
        skills: {
            languages: {
                title: 'Languages',
                items: [
                    'JavaScript/TypeScript',
                    'Python',
                    'C/C++',
                    'SASS/CSS',
                    'PHP',
                    'JSON',
                    'HTML',
                ]
            },
            tools: {
                title: 'Tools',
                items: [
                    'Angular 1 and 6',
                    'React',
                    'Node.js',
                    'Express',
                    'Selenium',
                    'Wordpress',
                    'Git',
                    'APIs',
                    'Linux'
                ]
            },
            databases: {
                title: 'Databases',
                items: [
                    'MongoDB',
                    'SQLite',
                    'Postgres'
                ]
            }
        }
    }

    render() {
        return (
            <div id="Skills">
                <div className="section-title">
                    <img src={ skillsTitle } alt="Skills" />
                </div>
                <div id="skills-columns">
                    <SkillsList list={this.state.skills.languages}/>
                    <SkillsList list={this.state.skills.tools}/>
                    <SkillsList list={this.state.skills.databases}/>
                </div>
            </div>
        );
    }
}

export default Skills;