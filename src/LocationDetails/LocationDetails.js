import React, { Component } from 'react';
import { View, Text } from 'react-native';

class LocationDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      open: '',
      id: ''
    };
  }


  componentDidMount() {
    fetch('https://maps.googleapis.com/maps/api/place/details/json?location=40.7506419,-73.9893568&placeid=ChIJ3xjWra5ZwokRrwJ0KZ4yKNs&key=AIzaSyC8ghKwfyUigqf7l0z06zJXOCHsXBKUgyw')
      .then((response) => response.json())
      .then((jsonResponse) => {
        console.log('this is name => ' + JSON.stringify(jsonResponse["result"]["name"]))
        console.log('this is are they open => ' + JSON.stringify(jsonResponse["result"]["opening_hours"]["open_now"]))
        console.log('this is id => ' + JSON.stringify(jsonResponse["result"]["id"]))
        this.setState({
          name: JSON.stringify(jsonResponse["result"]["name"]),
          open: JSON.stringify(jsonResponse["result"]["opening_hours"]["open_now"]),
          id: JSON.stringify(jsonResponse["result"]["id"])
        });
    })
  }

  render() {
    return (
      <View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Name: {this.state.name} </Text>
      </View>
    );
  }
}

export default LocationDetails;
