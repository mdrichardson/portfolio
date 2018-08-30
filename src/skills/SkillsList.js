import React from 'react';

const SkillsList = (props) => {
    if (props.list.title === 'Databases') {
        console.log(props.list.title)
        return (
            <div id={props.list.title.toLowerCase()}>
                <div>
                    <h2>{props.list.title}</h2>
                    <ul>
                        {props.list.items.map((item, index) => (
                            <li key={index} className="skillsItem">{item}</li>
                        ))}
                    </ul>
                </div>
                <div id="skills-statement">
                    <p>Everything needed to build beautiful, efficient, full-stack web apps and software.</p>
                </div>
            </div>
        )
    } return (
        <div id={props.list.title.toLowerCase()}>
            <h2>{props.list.title}</h2>
            <ul>
                {props.list.items.map((item, index) => (
                    <li key={index} className="skillsItem">{item}</li>
                ))}
            </ul>
        </div>
    )
}
    
    

        

export default SkillsList;