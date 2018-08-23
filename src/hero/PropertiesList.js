import React from 'react';

const PropertiesList = (props) => 
        props.list.map(property => (
            <p key={property.id}>{property.name}: <span className="bool">{property.value}</span>,</p>
        ))

export default PropertiesList;