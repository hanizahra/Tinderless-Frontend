'use strict';

import React, { Component } from 'react';
import {
StyleSheet,
Text,
View,
Image,
Button,
TouchableHighlight,
TouchableOpacity,
Navigator
} from 'react-native';
import t from 'tcomb-form-native'; // 0.6.9
import SwipeCards from 'react-native-swipe-cards';

class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={[styles.card, {backgroundColor: this.props.backgroundColor}]}>
        <Text>{this.props.text}</Text>
      </View>
    )
  }
}

class NoMoreCards extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Text style={styles.noMoreCardsText}>No more cards</Text>
      </View>
    )
  }
}

export default class SwipeMatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [
        {text: 'Tomato', backgroundColor: 'red'},
        {text: 'Aubergine', backgroundColor: 'purple'},
        {text: 'Courgette', backgroundColor: 'green'},
        {text: 'Blueberry', backgroundColor: 'blue'},
        {text: 'Umm...', backgroundColor: 'cyan'},
        {text: 'orange', backgroundColor: 'orange'},
      ]
    };
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

  handleYup (card) {
    console.log(`Yup for ${card.text}`)
  }
  handleNope (card) {
    console.log(`Nope for ${card.text}`)
  }
  handleMaybe (card) {
    console.log(`Maybe for ${card.text}`)
  }
  render() {
    // If you want a stack of cards instead of one-per-one view, activate stack mode
    // stack={true}
    return (
      <SwipeCards
        cards={this.state.cards}
        renderCard={(cardData) => <Card {...cardData} />}
        renderNoMoreCards={() => <NoMoreCards />}

        handleYup={this.handleYup}
        handleNope={this.handleNope}
        handleMaybe={this.handleMaybe}
        hasMaybeAction
      />
    )
  }
}

const styles = StyleSheet.create({
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 300,
  },
  noMoreCardsText: {
    fontSize: 22,
  }
})
