import React from 'react';

const LookingForList = (props) => (
    <div id="looking-for">
        <h2>Looking For</h2>
        <ul>
            {props.list.map((item, index) => {
                if (item.looking) {
                    return (
                        <li key={index} className="looking-for">{item.title}</li>
                    )
                }
            })}
        </ul>
    </div>
)

export default LookingForList;