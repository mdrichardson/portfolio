import React from 'react';
import LookingForList from './LookingForList';
import RelocateToList from './RelocateToList';

class OtherDetails extends React.Component {
    state = {
        lookingFor: [],
        location: '',
        relocate: []
    }

    componentDidMount() {
        this.setState({
            lookingFor: [
                {title: 'Full-Time Employment', looking: true},
                {title: 'Weekend Contract Work', looking: false},
                {title: 'Open to Offers', looking: true},
                {title: 'Nothing', looking: false}
            ],
            location: 'Seattle',
            relocate: [
                { location: 'Portland, OR', willing: true },
                { location: 'Out of Country', willing: true }
            ]
        })
    }

    render() {
        return (
            <div id="other-details" className={ this.props.className }>
                <div id="location">
                    <h2>Location</h2>
                    <ul id="location-name"><li>{ this.state.location }</li></ul>
                </div>
                <RelocateToList list={ this.state.relocate }/>
                <LookingForList list={ this.state.lookingFor }/>
            </div>
        );
    }
}

export default OtherDetails;