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
} from 'react-native';


export default class PhotoUpload extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      avatarSource: null,
    }
  }

  componentDidMount() {
    console.log('loaded', this.state, ImagePicker.showImagePicker)
    const { navigate } = this.props.navigation
  }

  selectPhotoTapped() {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      apiServices.addUserPhoto(image.path)
      console.log('this is the image --> ', image.path);
    })
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
