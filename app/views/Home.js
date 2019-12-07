import React from 'react';
import { View, Text } from 'react-native'
import { iOSUIKit } from 'react-native-typography'

export default class Home extends React.Component {
  constructor(props){
    super(props)
  }

  render() {
    return(
      <View style={{flex: 1, marginTop: 5}}>
          <Text style={iOSUIKit.title3}>Welcome to cool camera</Text>
      </View>
    )
  }
}