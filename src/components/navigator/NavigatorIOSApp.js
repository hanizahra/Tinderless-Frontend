import React from 'react';
import PropTypes from 'prop-types';
import {Button, NavigatorIOS, Text, View} from 'react-native';
import SignupForm from '../user/account/SignupForm'

export default class NavigatorIOSApp extends React.Component {
  render() {
    return (
      <NavigatorIOS
        initialRoute={{
          component: SignupForm,
          title: 'My Initial Scene',
          passProps: {index: 1},
        }}
      />
    );
  }
}

