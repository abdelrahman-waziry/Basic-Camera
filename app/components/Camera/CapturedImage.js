import React, {Component} from 'react'
import {View, StatusBar, ImageBackground} from 'react-native'
import {ImageManipulator} from 'expo'
import {styles} from './style'

import { STYLE_CONSTANTS } from '../consts'

export default class CapturedImage extends Component {
    constructor(props){
        super(props)
    }

    render(){
        const { navigation } = this.props
        let uri = navigation.getParam('uri', '')
        return(
            <View style={[styles.formViewContainer, {
                backgroundColor: '#000'
            }]}>
                <ImageBackground style={{
                    height: STYLE_CONSTANTS.DeviceHeight - StatusBar.currentHeight * 2,
                    width: STYLE_CONSTANTS.DeviceWidth,
                    marginTop: StatusBar.currentHeight
                }} source={{uri: uri}}
                >
                </ImageBackground>
            </View>
        )
    }
}