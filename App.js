/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import UserPosition from './src/UserPosition/UserPosition'
import UserLocationId from './src/UserLocationId/UserLocationId'

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>

        <Text style={styles.welcome}>
           <UserLocationId />
        </Text>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fab1a0',
  },
  welcome: {
    fontSize: 25,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#0984e3',
    marginBottom: 5,
  },
});
