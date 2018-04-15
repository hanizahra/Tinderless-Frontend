import React, { Component } from 'react';
import { View, StyleSheet, Button, TouchableHighlight, Text, TouchableOpacity } from 'react-native';
import PhotoUpdate from './PhotoUpdate';
import apiServices from '../../../apiServices/apiServices';

import t from 'tcomb-form-native'; // 0.6.9

const Form = t.form.Form;

const GenderSeeking = t.enums({
  M: 'Male',
  F: 'Female',
  T: 'Trans',
  E: 'Everyone!',
});

const AgeSeeking = t.enums({
  1: "Age is just a number!",
  2: '18-29',
  3: '30-39',
  4: '40-49',
  5: "50+"
});

const Person = t.struct({
  "gender_seeking": GenderSeeking,
  "age_seeking": AgeSeeking
});

const options = {
    fields: {
    "gender_seeking": {
      label: "I'm seeking",
      error: 'Required'
    },
    "age_seeking": {
      label: "Between",
      error: 'Required'
    }
  },
};

export default class AccountSettings extends Component {
  constructor(props){
    super(props)
    this.state = {
      apiDataLoaded: false,
      apiData: '',
    }
  }

  componentDidMount() {
    // console.log('component did mount user --->', this.props.match.params.id)
    apiServices.getOneUser(1)
    .then(user => {
      console.log('getOneUser is here--->',user)
      this.setState({
        apiDataLoaded: true,
        apiData: user.data.dataShowOne.user
      })
      console.log('this is what we will use--> ', this.state.apiData)
    })
  }

  handleSubmit = () => {
    const value = this._form.getValue(); // use that ref to get the form value
    console.log('new value for updated account: ', value);
    console.log('this is this.state-->', this.state.apiData)
    apiServices.updateUser(value, this.state.apiData.id)
    const { navigate } = this.props.navigation
    navigate('SwipeScreen')
  }

  static navigationOptions = {
      title: 'AccountScreen',
      headerStyle: {
        backgroundColor: '#74b9ff'
      },
      headerTintColor: '#ff7675',
      // headerLeft: {
      // },
  };

  // signupPage = () => {
  //   const value = this._form.getValue(); // use that ref to get the form value
  //   console.log('value: ', value);
  //   const { navigate } = this.props.navigation
  //   navigate('RegisterScreen')
  // }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.photoUpdate}>
          <PhotoUpdate />
        </View>
        <Text>
          { this.state.apiData.username }
        </Text>
        <Form
          ref={c => this._form = c}
          type={Person}
          options={options}
          value={this.state.apiData}
        />
        <TouchableHighlight style={styles.button} onPress={this.handleSubmit} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button} onPress={this.handleSubmit} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.DeleteButton} onPress={this.handleSubmit} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Delete Account</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  photoUpdate: {
    flex: 1
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  DeleteButton: {
    height: 36,
    backgroundColor: 'red',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});
