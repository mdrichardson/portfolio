import React from 'react';
import './skills.css';
import skillsTitle from '../images/skills.svg';
import SkillsList from './SkillsList';
import { StickyContainer, Sticky } from 'react-sticky';

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
            <StickyContainer>
            <div id="Skills">
                <div className="section-title">
                    <Sticky bottomOffset={50}>
                        {({ style, isSticky }) =>
                            <img style={ style } className={ isSticky ? "sticky" : "" } src={ skillsTitle } alt="Skills" />}
                    </Sticky>
                </div>
                <div id="skills-columns">
                    <SkillsList list={this.state.skills.languages}/>
                    <SkillsList list={this.state.skills.tools}/>
                    <SkillsList list={this.state.skills.databases}/>
                </div>
            </div>
            </StickyContainer>
        );
    }
}

export default Skills;