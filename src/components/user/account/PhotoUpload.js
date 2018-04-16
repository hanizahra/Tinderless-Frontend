import React from 'react';
import ImagePicker  from 'react-native-image-crop-picker';
import apiServices from '../../../apiServices/apiServices';
import Home from '../../../../App';
import {
  StyleSheet,
  Text,
  View,
  PixelRatio,
  TouchableOpacity,
  Image,
  AsyncStorage
} from 'react-native';


export default class PhotoUpload extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      avatarSource: null,
    }
  }

  componentDidMount() {
    // setInterval(() => {
      console.log('loaded', this.state, ImagePicker.showImagePicker)
      if (this.state.avatarSource !== null) {
      return this.nextPage()
      } else {
        console.log('this is this.state.avatarSource -->', this.state.avatarSource)
      }
    // }, 1000)
  }

  selectPhotoTapped = () => {

    AsyncStorage.getItem('auth').then((token) =>
    {
      let authToken = (JSON.parse(token));
      let userId = authToken.authToken;

      console.log('In PhotoUpload the userId is: ', userId);
      console.log('props:', this.props.navigation);
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true
      }).then(image => {
        apiServices.addUserPhoto(userId, image.path)
        AsyncStorage.getItem('auth').then(token => {console.log('auth token is', JSON.parse(token));});
        console.log('this is the image --> ', image.path);
        console.log('this is all the image data-->', image)
        this.nextPage();
      }).catch(err => {
        console.log('this is err', err)
      })
    });

  }

  nextPage = () => {
    const { navigate } = this.props.navigation
    navigate('SwipeScreen')
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.selectPhotoTapped}>
          <View style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>
          { this.state.avatarSource === null ? <Text>Select a Photo</Text> :
            <Image style={styles.avatar} source={this.state.avatarSource} />
          }
          </View>
        </TouchableOpacity>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  avatarContainer: {
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    borderRadius: 75,
    width: 150,
    height: 150
  }
});
