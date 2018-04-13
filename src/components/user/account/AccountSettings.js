import React, { Component } from 'react';
import { View, StyleSheet, Button, TouchableHighlight, Text, TouchableOpacity } from 'react-native';

import t from 'tcomb-form-native'; // 0.6.9

const Form = t.form.Form;

const GenderSeeking = t.enums({
  M: 'Male',
  F: 'Female',
  T: 'Trans',
  E: 'Everyone!'
});

const AgeSeeking = t.enums({
  1: "Age is just a number!",
  2: '18-29',
  3: '30-39',
  4: '40-49',
  5: "50+"
});

const Person = t.struct({
  "I'm seeking": GenderSeeking,
  "Between": AgeSeeking
});

// const options = {
//     fields: {
//     "I identify as": {
//       error: 'Required'
//     },
//     age: {
//       error: 'Required'
//     },
//     "I'm seeking": {
//       error: 'Required'
//     },
//     "Between": {
//       error: 'Required'
//     }
//   },
// };

export default class AccountSettings extends Component {


  handleSubmit = () => {
    const value = this._form.getValue(); // use that ref to get the form value
    console.log('value: ', value);
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

  signupPage = () => {
    const value = this._form.getValue(); // use that ref to get the form value
    console.log('value: ', value);
    const { navigate } = this.props.navigation
    navigate('RegisterScreen')
  }

  render() {
    return (
      <View style={styles.container}>
        <Form
          ref={c => this._form = c}
          type={Person}
          // options={options}
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
