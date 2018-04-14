import React, { Component } from 'react';
import { View, StyleSheet, Button, TouchableHighlight, Text } from 'react-native';
import apiServices from '../../../apiServices/apiServices';
import Home from '../../../../App';
import t from 'tcomb-form-native'; // 0.6.9

const Form = t.form.Form;

const User = t.struct({
  email: t.String,
  username: t.String,
  password: t.String,
  terms: t.Boolean
});

const options = {
    fields: {
    email: {
      error: 'Required'
    },
    password: {
      error: 'Required'
    },
    terms: {
      label: 'Agree to Terms',
    },
  },
};

export default class RegisterForm extends Component {


  handleSubmit = () => {
    const value = this._form.getValue(); // use that ref to get the form value
    // console.log('value: ', value);
    const { navigate } = this.props.navigation
    navigate('ProfileScreen')
    apiServices.addUser(value)
    console.log('user info sent to apiServices ===>', value)
  }

  // addUser() {
  //   apiServices.addUser(value)
  //   console.log('user info sent to apiServices ===>', value)
  // }

  render() {
    return (
      <View style={styles.container}>
        <Form
          ref={c => this._form = c}
          type={User}
          options={options}
        />

        <TouchableHighlight style={styles.button} onPress={this.handleSubmit} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Sign Up!</Text>
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
  }
});
