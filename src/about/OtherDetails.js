import React from 'react';
import LookingForList from './LookingForList';

class OtherDetails extends React.Component {
    state = {
        lookingFor: [
            {title: 'Full-Time Employment', looking: true},
            {title: 'Weekend Contract Work', looking: true},
            {title: 'Open to Offers', looking: false},
            {title: 'Nothing', looking: false}
        ],
        location: 'Seattle',
    }

    render() {
        return (
            <div id="other-details" className={ this.props.className }>
                <div id="location">
                    <h2>Location</h2>
                    <ul id="location-name"><li>{ this.state.location }</li></ul>
                </div>
                <LookingForList list={ this.state.lookingFor }/>
            </div>
        );
    }
}

export default OtherDetails;