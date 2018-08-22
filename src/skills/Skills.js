import React from 'react';
import './skills.css';
import skillsTitle from '../images/skills.svg'

const Skills = () => {
    return (
        <div id="Skills">
            <div className="section-title">
                <img src={ skillsTitle } alt="Skills" />
            </div>
            <div id="skills-columns">
                <div id="languages">
                    <h2>Languages</h2>
                    <ul>
                        <li>JavaScript/TypeScript</li>
                        <li>Python</li>
                        <li>C/C++</li>
                        <li>SASS/CSS</li>
                        <li>PHP</li>
                        <li>JSON</li>
                        <li>HTML</li>
                    </ul>
                </div>
                <div id="tools">
                    <h2>Tools</h2>
                    <ul>
                        <li>Angular 1 and 6</li>
                        <li>React</li>
                        <li>Node.js</li>
                        <li>Express</li>
                        <li>Selenium</li>
                        <li>Wordpress</li>
                        <li>Git</li>
                        <li>APIs</li>
                        <li>Linux</li>
                    </ul>
                </div>
                <div id="databases">
                    <h2>Databases</h2>
                    <ul>
                        <li>MongoDB</li>
                        <li>SQLite</li>
                        <li>Postgres</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Skills;