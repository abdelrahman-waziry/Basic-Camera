import React from 'react'
import { Animated, Easing } from 'react-native'
import {createStackNavigator } from 'react-navigation';
import CapturedImage from '../components/Camera/CapturedImage'
import Camera from '../views/Camera';


export const CameraStack = createStackNavigator({
  Create: {
    screen: Camera
  },
  CapturedImage: {
    screen: CapturedImage
  },
},
  {
    headerMode: 'none',
    transitionConfig: () => ({
      transitionSpec: {
        duration: 0,
        timing: Animated.timing,
        easing: Easing.step0,
      },
    })
})