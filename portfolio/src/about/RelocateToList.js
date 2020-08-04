import React from 'react';

const RelocateToList = (props) => (
  <div id="relocate-to">
    <h2>Can To Relocate To</h2>
    <ul>
      {props.list.map((item, index) => {
        if (item.willing) {
          return (
            <li key={index} className="relocate-to">{item.location}</li>
          )
        } else { return null }
      })}
    </ul>
  </div>
)

export default RelocateToList;