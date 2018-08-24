import React from 'react';

class ProjectBullets extends React.Component {
    render() {
        return (
            this.props.list.map((bullet, index) => (
                <li key={index}>{bullet}</li>
            ))
        )
    }
}
        

export default ProjectBullets;