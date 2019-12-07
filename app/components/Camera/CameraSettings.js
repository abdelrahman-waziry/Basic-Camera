import React, { Component } from 'react'
import {View} from 'react-native'
import {Entypo} from '@expo/vector-icons'
import { styles } from './style'

export default class CameraSettings extends Component {
    render() {
        return (
            <View style={styles.cameraSettingsContainer}>
                <Entypo name='dots-three-vertical'/>
            </View>
        )
    }
}