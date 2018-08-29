import React from 'react';

const SkillsList = (props) => (
    <div id={props.list.title.toLowerCase()}>
        <h2>{props.list.title}</h2>
        <ul>
            {props.list.items.map((item, index) => (
                <li key={index} className="skillsItem">{item}</li>
            ))}
        </ul>
    </div>
)
        

export default SkillsList;