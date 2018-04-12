import React from 'react';
import { StackNavigator } from 'react-navigation';
import SignupForm from './src/components/user/account/SignupForm'
import LoginForm from './src/components/user/account/LoginForm'
import ProfileForm from './src/components/user/account/ProfileForm'
import LogoutForm from './src/components/user/account/LogoutForm'
import RegisterForm from './src/components/user/account/RegisterForm'
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
  SignUpScreen : {screen: SignupForm},
  LogInScreen : {screen: LoginForm},
  ProfileScreen: {screen: ProfileForm},
  LogOutScreen : {screen: LogoutForm},
  RegisterScreen : {screen: RegisterForm}
})

export default Home
