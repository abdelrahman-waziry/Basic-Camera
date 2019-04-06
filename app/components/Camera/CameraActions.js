import React, { Component } from 'react'
import { View, Text } from 'react-native'
import ButtonIcon from '../Buttons/ButtonIcon'
import { Feather, FontAwesome } from '@expo/vector-icons'
import { styles } from './style';

export default class CameraActions extends Component {
    render() {
        return (
            <View style={styles.actionsContainer}>
                <ButtonIcon
                    loaded={true}
                    onPress={() => {
                        this.props.toggleFlash()
                    }}
                    styles={styles.actionButton}
                    icon={
                        <Feather name='zap' size={25} color='#fff' />
                    }
                />
                <ButtonIcon
                    loaded={true}
                    onPress={() => {
                        this.props.captureImage()
                    }}
                    styles={styles.actionButton}
                    icon={
                        <FontAwesome name='camera' size={50} color='#fff' />
                    }
                />
                <ButtonIcon
                    loaded={true}
                    onPress={() => {
                        this.props.flipCamera()
                    }}
                    styles={styles.actionButton}
                    icon={
                        <Feather name={this.props.cameraViewState.type == 0 ?
                            'refresh-cw' : 'refresh-ccw'} size={25} color='#fff' />
                    }
                />
            </View>
        )
    }
}