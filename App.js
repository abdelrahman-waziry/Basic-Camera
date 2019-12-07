import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import Home from './app/views/Home'
import Camera from './app/views/Camera';
import CapturedImage from './app/components/Camera/CapturedImage';

const CameraStack = createStackNavigator({
  Create: {
    screen: Camera
  },
  CapturedImage: {
    screen: CapturedImage
  },
},
  {
    headerMode: 'none',
})

const HomeStack = createStackNavigator({
  Home: {
    screen: Home
  }
}, {
  headerMode: 'none'
})


export default createAppContainer(HomeStack);