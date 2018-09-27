import React from 'react';

const SkillsList = (props) => {
    // Databases is the last one and we need to add a statement after it. I want it to always be the same width as and to move
    //  with the databases list, so it needs to go here
    if (props.list.title === 'Databases') {
        return (
            <div id={props.list.title.toLowerCase()}>
                <div>
                    <h3>{props.list.title}</h3>
                    <ul>
                        {props.list.items.map((item, index) => (
                            <li key={index} className="skillsItem">{item}</li>
                        ))}
                    </ul>
                </div>
                <div id="skills-statement">
                    <p class="statement">Everything needed to build beautiful, efficient, full-stack web apps and software.</p>
                </div>
            </div>
        )
    } return (
        <div id={props.list.title.toLowerCase()}>
            <h3>{props.list.title}</h3>
            <ul>
                {props.list.items.map((item, index) => (
                    <li key={index} className="skillsItem">{item}</li>
                ))}
            </ul>
        </div>
    )
}
    
    

        

export default SkillsList;