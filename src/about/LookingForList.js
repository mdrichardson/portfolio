import React from 'react';

const LookingForList = (props) => (
    <div id="looking-for">
        <h2>Looking For</h2>
        <ul>
            {props.list.map((item, index) => (
                <li key={index} hidden={!item.looking}>{item.title}</li>
            ))}
        </ul>
    </div>
)

export default LookingForList;