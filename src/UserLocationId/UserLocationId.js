import React, { Component } from 'react';
import { View, Text } from 'react-native';

class UserLocationId extends Component {
  constructor(props) {
    super(props);

    this.state = {
      place_id: '',
      streetAddress: ''
    };
  }


  componentDidMount() {
    fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng=40.739844,-73.990201&key=AIzaSyC8ghKwfyUigqf7l0z06zJXOCHsXBKUgyw')
      .then((response) => response.json())
      .then((jsonResponse) => {
        console.log('this is the place id => ' + JSON.stringify(jsonResponse["results"][0]["place_id"]))
        this.setState({
          place_id: JSON.stringify(jsonResponse["results"][0]["place_id"]),
          streetAddress: JSON.stringify(jsonResponse["results"][0]["formatted_address"])
        });
        console.log('street address here', JSON.parse(this.state.streetAddress))
    })
  }

  render() {
    return (
      <View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>address: { this.state.streetAddress }</Text>
      </View>
    );
  }
}

export default UserLocationId;
