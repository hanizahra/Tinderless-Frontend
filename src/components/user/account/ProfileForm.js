import React, { Component } from 'react';
import { View, StyleSheet, Button, TouchableHighlight, Text } from 'react-native';
import apiServices from '../../../apiServices/apiServices';
import Home from '../../../../App';

import t from 'tcomb-form-native'; // 0.6.9

const Form = t.form.Form;

const Gender = t.enums({
  M: 'Male',
  F: 'Female',
  T: 'Trans'
});

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
  "gender": Gender,
  age: t.Number,
  "gender_seeking": GenderSeeking,
  "age_seeking": AgeSeeking
});

const options = {
  fields: {
    "gender": {
      label: "I identify as",
      error: 'Required'
    },
    age: {
      error: 'Required'
    },
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

export default class ProfileForm extends Component {


  handleSubmit = () => {
    const value = this._form.getValue(); // use that ref to get the form value
    console.log('value: ', value);
    const { navigate } = this.props.navigation
    navigate('PhotoUploadScreen',  Object.assign({}, this.props.navigation.state.params, value))
    apiServices.addUser( Object.assign({}, this.props.navigation.state.params, value));
    console.log('the data: ', Object.assign({}, this.props.navigation.state.params, value));
  }

  render() {
    return (
      <View style={styles.container}>
        <Form
          ref={c => this._form = c}
          type={Person}
          options={options}
        />
        <TouchableHighlight style={styles.button} onPress={this.handleSubmit} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Done!</Text>
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
