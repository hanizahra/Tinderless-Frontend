import React, { Component } from 'react';
import { View, StyleSheet, Button, TouchableHighlight, Text, Navigator, TouchableOpacity } from 'react-native';

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


export default class SwipeMatch extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
    this.renderMatchScreen = this.renderMatchScreen.bind(this)
    this.renderSettingsScreen = this.renderSettingsScreen.bind(this)
    this.props.navigation.setParams({
      handleRender: this.renderMatchScreen,
      handleRender2: this.renderSettingsScreen
    })
  }

  static navigationOptions = ({ navigation }) => ({
    headerRight: <Button onPress={() => navigation.state.params.handleRender()} title='Matches'/>,
    headerLeft: <Button onPress={() => navigation.state.params.handleRender2()} title='Account' />
  })

  componentDidMount(){
    console.log('this is props',this.props)
  }

  renderMatchScreen(){
    console.log('i hit matches')
    const {navigate} = this.props.navigation
    navigate("MatchedScreen")
  }

  renderSettingsScreen(){
    console.log('i hit matches')
    const {navigate} = this.props.navigation
    navigate("AccountScreen")
  }

  handleSubmit = () => {
    const value = this._form.getValue(); // use that ref to get the form value
    console.log('value: ', value);
    const { navigate } = this.props.navigation
    navigate('SwipeScreen')
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>
          Swiping coming soon
        </Text>
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
