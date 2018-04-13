import React from 'react';
import { StackNavigator } from 'react-navigation';
import SignupForm from './src/components/user/account/SignupForm';
import LoginForm from './src/components/user/account/LoginForm';
import ProfileForm from './src/components/user/account/ProfileForm';
import RegisterForm from './src/components/user/account/RegisterForm';
import SwipeMatch from './src/components/matching/SwipeMatch';
import Matches from './src/components/matching/Matches';
import AccountSettings from './src/components/user/account/AccountSettings';
import PhotoUpload from './src/components/user/account/PhotoUpload';
import ModalMatch from './src/components/matching/ModalMatch';
import App from './App'

import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  NavigatorIOS
} from 'react-native';

const Home = StackNavigator ({
  AccountScreen: {screen: AccountSettings},
  SwipeScreen: {screen: SwipeMatch},
  ModalScreen: {screen: ModalMatch},
  PhotoUploadScreen: {screen: PhotoUpload},
  RegisterScreen : {screen: RegisterForm},
  // SwipeScreen: {screen: SwipeMatch},
  LogInScreen : {screen: LoginForm},
  // SwipeScreen: {screen: SwipeMatch},
  MatchedScreen: {screen: Matches},
  // AccountScreen: {screen: AccountSettings},
  SignUpScreen : {screen: SignupForm},
  // LogInScreen : {screen: LoginForm},
  ProfileScreen: {screen: ProfileForm},
})

export default Home
