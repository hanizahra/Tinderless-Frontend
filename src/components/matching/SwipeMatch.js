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
Navigator,
AsyncStorage,
Alert
} from 'react-native';
import t from 'tcomb-form-native'; // 0.6.9
import SwipeCards from 'react-native-swipe-cards';
import Modal from 'react-native-modal';
import ModalMatch from './ModalMatch';
import apiServices from '../../apiServices/apiServices';

class Card extends React.Component {
  constructor(props) {
    super(props);
  }

componentDidMount(){
  console.log(`I AM THE SINGLE CARD`, this.props)
}

  render() {
    return (
      <View style={[styles.card, {backgroundColor: this.props.backgroundColor}]}>
        <Image style={styles.thumbnail} source={{uri: this.props.image}} />
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

// const cards = [
//   {name: '1', image: 'https://media.giphy.com/media/GfXFVHUzjlbOg/giphy.gif'},
//   {name: '2', image: 'https://media.giphy.com/media/irTuv1L1T34TC/giphy.gif'},
//   {name: '3', image: 'https://media.giphy.com/media/LkLL0HJerdXMI/giphy.gif'},
//   {name: '4', image: 'https://media.giphy.com/media/fFBmUMzFL5zRS/giphy.gif'},
//   {name: '5', image: 'https://media.giphy.com/media/oDLDbBgf0dkis/giphy.gif'},
//   {name: '6', image: 'https://media.giphy.com/media/7r4g8V2UkBUcw/giphy.gif'},
//   {name: '7', image: 'https://media.giphy.com/media/K6Q7ZCdLy8pCE/giphy.gif'},
//   {name: '8', image: 'https://media.giphy.com/media/hEwST9KM0UGti/giphy.gif'},
//   {name: '9', image: 'https://media.giphy.com/media/3oEduJbDtIuA2VrtS0/giphy.gif'},
// ]

// const cards2 = [
//   {name: '10', image: 'https://media.giphy.com/media/12b3E4U9aSndxC/giphy.gif'},
//   {name: '11', image: 'https://media4.giphy.com/media/6csVEPEmHWhWg/200.gif'},
//   {name: '12', image: 'https://media4.giphy.com/media/AA69fOAMCPa4o/200.gif'},
//   {name: '13', image: 'https://media.giphy.com/media/OVHFny0I7njuU/giphy.gif'},
// ]

export default class SwipeMatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      oufOfCards: false,
      hasInfo: false,
      currentUserId: null,
      message: ""
    };
    this.renderMatchScreen = this.renderMatchScreen.bind(this)
    this.renderSettingsScreen = this.renderSettingsScreen.bind(this)
    this.handleMatch = this.handleMatch.bind(this)
    this.handleYup = this.handleYup.bind(this)
    this.props.navigation.setParams({
      handleRender: this.renderMatchScreen,
      handleRender2: this.renderSettingsScreen,
    })
    this.latitude = null;
    this.longitude =  null;
    this.place_id =  null;
    this.streetAddress =  null;
    this.name =  null;
    this.open =  null;
    this.id =  null;
    this.error = null;
  }






  getPosition = () => {
    return new Promise((resolve,reject) => {
      navigator.geolocation.getCurrentPosition((position) => {

        this.latitude =  position.coords.latitude;
        this.longitude =  position.coords.longitude;
        this.error =  null;
        console.log('getting user position', this.latitude, this.longitude);
        resolve();
      },
      (error) => {
        //this.setState({ error: error.message }); reject()
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  });
  };

  geocodeLocation  = () => {
    return new Promise((resolve, reject) => {

     fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng='+this.latitude+','+this.longitude+'&key=AIzaSyC8ghKwfyUigqf7l0z06zJXOCHsXBKUgyw')
      .then((response) => response.json())
      .then((jsonResponse) => {
        console.log('this is the place id => ' + JSON.stringify(jsonResponse["results"][0]["place_id"]))
        // this.setState({
          this.place_id =  jsonResponse["results"][0]["place_id"];
          this.streetAddress =  jsonResponse["results"][0]["formatted_address"];
        // });
        console.log('geocoding user location')
        console.log('street address here', this.streetAddress);
        resolve();
    });

    });

  }

  getLocationDetails = (userId) => {
    console.log('getLocationDetails', this.latitude, this.longitude, this.place_id);
    let url = 'https://maps.googleapis.com/maps/api/place/details/json?location='+this.latitude+','+this.longitude+'&placeid='+this.place_id+'&key=AIzaSyC8ghKwfyUigqf7l0z06zJXOCHsXBKUgyw';
    console.log('url', url);
    return new Promise((resolve, reject) => {
      fetch(url)
        .then((response) => response.json())
        .then((jsonResponse) => {

          let location = {
            location_name: jsonResponse.result.name,
            formatted_address: jsonResponse.result.formatted_address,
            place_id: jsonResponse.result.place_id,
            location_url: jsonResponse.result.url
          }
          apiServices.updateLocation(userId, location).then((data) => {
            console.log('result of updateLocation:', data);
            resolve();
          });

        }).catch((err) => {
            console.log('error -->', err)
          })
    })
  }

  getNearbyPeople = (userId) =>
  {
    return new Promise(function(resolve, reject)
    {
      apiServices.getNearbyPeople(userId).then((data) =>
        {
          console.log('getNearbyPeople data: ', data);
          resolve(data);
        });
    })
  }

  getUserPosition = (userId) => {
    navigator.geolocation.watchPosition(() => {
    // setInterval(() =>
    // {
        this.getPosition()
        .then((result) => {
          return this.geocodeLocation();
        })
        .then((result) => {
          return this.getLocationDetails(userId);
        })
        .then((result) => {
          console.log("userid ------", userId)
          return this.getNearbyPeople(userId)

          //console.log('current location: ', this.latitude, this.longitude);
        })
        .then((result) =>
        {
          console.log('result:', result);
          let cards = [];
          for(let idx in result.data.nearbyPeople)
          {
            let person = result.data.nearbyPeople[idx];

            cards.push({id: person.id, name: person.username, image: person.photo});
            console.log(`-------->`, cards)
          }

          // result.data.nearbyPeople.map((person) =>
          // {
          //   return [name: person.email, image: 'https://media.giphy.com/media/GfXFVHUzjlbOg/giphy.gif'];
          // })
          // console.log('cards', cards);
          this.setState({hasInfo:true, cards: cards, outOfCards: false, currentUserId: userId}, () => console.log(`I AM THE NEW USER POSITION`, this.state));
        });
      });
    // },5000);
  }






  componentDidMount()
  {
    console.log(`I just mounted!`, this.props, this.state);
    try
    {
      AsyncStorage.getItem('auth').then(token => {
        console.log('auth token is', JSON.parse(token));
        let authToken = JSON.parse(token);
        let userId = authToken.authToken
        this.getUserPosition(userId);
      });
    }
    catch(error)
    {
      console.log(error);
    }
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
    console.log(`Yup for ${card}`, card, this.state.currentUserId)
    let likeData = {
      person_they_swiped_yes_on_user_id: card.id,
      swiper_user_id: this.state.currentUserId
    }
    apiServices.addLike(likeData)
    .then(likeData => {
      console.log(`I am the like data`, likeData)
     let check = {
      person_they_swiped_yes_on_user_id: likeData.data.userData.swiper_user_id,
      swiper_user_id: likeData.data.userData.person_they_swiped_yes_on_user_id
     }
     this.checkForMatch(check)
    })
    .catch((err) => {
      console.log('this is error', err)
    })
  }

  checkForMatch(data){
    console.log(`About to check the match table`, data)
    apiServices.checkForMatch(data)
    .then(result => {
      console.log(`I am the front end result!`, result)
      this.setState({
        message: result.data.message,
        matchedUserId: result.data.data.swiper_user_id
      }, () => this.handleMatch())
    })
    .catch(err => {
      console.log(`Ryan fucked up`, err)
    })
  }

  handleMatch(){
    Alert.alert(this.state.message)
      // let matchData = {
      //   user_one: this.state.currentUserId,
      //   user_two: this.state.matchedUserId
      // }
      // apiServices.createMatch(matchData)
      // .then(result => {
      //   console.log(`I stored in match table, in front end`, result)
      // })
      // .catch(err => {
      //   console.log(`I am an error for storing matches`, err)
      // })
  }

  handleNope (card) {
    console.log(`Nope for ${card.text}`)
  }

  cardRemoved (index) {
    console.log(`The index is ${index}`);

    let CARD_REFRESH_LIMIT = 3

    if (this.state.cards.length - index <= CARD_REFRESH_LIMIT + 1) {
      console.log(`There are only ${this.state.cards.length - index - 1} cards left.`);

      if (!this.state.outOfCards) {
        //console.log(`Adding ${cards2.length} more cards`)

        this.setState({
          //cards: this.state.cards.concat(cards2),
          outOfCards: true
        })
      }

    }

  }

  render() {
    // If you want a stack of cards instead of one-per-one view, activate stack mode
    // stack={true}
    // let test = (<View><Text>Loading Nearby People...</Text></View>);
    // if(this.state.hasInfo)
    // {
    //   test = ( );
    // }
    return (
     <View style={{
                  flex: 1,
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'blue'
                }}>
      {this.state.message}
      <SwipeCards
        cards={this.state.cards}
        loop={false}

        renderCard={(cardData) => <Card {...cardData} />}
        renderNoMoreCards={() => <NoMoreCards />}
        showYup={true}
        showNope={true}

        handleYup={this.handleYup}
        handleNope={this.handleNope}
        cardRemoved={this.cardRemoved.bind(this)}
      />



      </View>

    )
  }
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    borderRadius: 5,
    overflow: 'hidden',
    borderColor: 'grey',
    backgroundColor: 'white',
    borderWidth: 1,
    elevation: 1,
  },
  modalBackground: {
    backgroundColor: 'red'
  },
  noMoreCardsText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnail: {
    width: 300,
    height: 300,
  },
  text: {
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 10
  },
})
