import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';
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



export default createAppContainer(CameraStack);