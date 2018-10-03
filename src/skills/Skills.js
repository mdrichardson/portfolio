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
        })
    }

    render() {
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
                    <SkillsList list={this.state.skills.languages} className={ this.props.nowVisible ? "animated" : "" }/>
                    <SkillsList list={this.state.skills.tools} className={ this.props.nowVisible ? "animated" : "" }/>
                    <SkillsList list={this.state.skills.databases} className={ this.props.nowVisible ? "animated" : "" }/>
                </div>
            </div>
            </StickyContainer>
        );
    }
}

export default Skills;