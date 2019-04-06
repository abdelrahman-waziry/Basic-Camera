import React, {Component} from 'react'
import {View, Image, Text} from 'react-native'
import { styles } from './style';
import GenericButton from '../Buttons/GenericButton';
import { STYLE_CONSTANTS } from '../consts';

export default class EmptyState extends Component {
    render(){
        return(
            <View style={styles.emptyStateContainer}>
                {this.props.icon}
                <Text style={[styles.emptyStateMessage, {fontSize: this.props.messageSize}]}>
                    {this.props.emptyMessage}
                </Text>
                {this.props.hasAction && <GenericButton
                    loaded={true}
                    loadingColor='#fff'
                    styles={{ borderRadius: 4, padding: 10, paddingVertical: 10, width: '60%', marginTop: 20 }}
                    buttonColor={STYLE_CONSTANTS.PrimaryColor}
                    text={this.props.callToAction}
                    onPress={() => {
                        this.props.onAction()
                    }}
                />}
            </View>
        )
    }
} 