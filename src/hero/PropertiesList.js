import React from 'react';
import PropertiesItem from './PropertiesItem';

// Originally had PropertiesItem.js merged into here, but it throws a Controlled Input error
// since this component would have to hold the state of each item and it had to be generated dynamically.

class PropertiesList extends React.Component {  

  render() {
    return(
      this.props.list.map(property => (
        <PropertiesItem name={ property.name } value={ property.value } key={property.id} egg={ property.easterEggs }/>
      ))
    )
  }

} 
        

export default PropertiesList;