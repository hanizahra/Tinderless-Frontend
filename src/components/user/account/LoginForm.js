import React, { Component } from 'react';
import { View, StyleSheet, Button, TouchableHighlight, Text, AsyncStorage} from 'react-native';
import Home from '../../../../App';
import apiServices from '../../../apiServices/apiServices';

import t from 'tcomb-form-native'; // 0.6.9

const Form = t.form.Form;

const User = t.struct({
  username: t.String,
  password: t.String
});

const options = {
    fields: {
    username: {
      error: 'Required'
    },
    password: {
      error: 'Required'
    }
  },
};

export default class LoginForm extends Component {


  handleSubmit = () => {
    const value = this._form.getValue(); // use that ref to get the form value
    console.log('value: ', value);
    const { navigate } = this.props.navigation
    apiServices.loginUser(value.username, value.password).then((response) =>
    {
      let auth = 'auth';
      AsyncStorage.setItem(auth, JSON.stringify({authToken: response.data.user.id}));
      //console.log('login response: ', response);
      navigate('SwipeScreen');
    }).catch((err) => {
      console.log('login error: ', err);
    })

  }

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
          type={User}
          options={options}
        />

        <TouchableHighlight style={styles.button} onPress={this.handleSubmit} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableHighlight>
        <Button
          title="Sign Up!"
          onPress={this.signupPage}
        />
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
