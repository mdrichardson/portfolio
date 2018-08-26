import React from 'react';
import LookingForList from './LookingForList';

class OtherDetails extends React.Component {
    state = {
        lookingFor: [
            ['Full-Time Employment', true],
            ['Weekend Contract Work', true],
            ['Open to Offers', false],
            ['Nothing', false]
        ],
        location: 'Seattle',
    }

    render() {
        return (
            <div id="other-details">
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