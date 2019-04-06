import React, { Component } from 'react'
import {View, Text, TouchableWithoutFeedback, ActivityIndicator} from 'react-native'
import { styles } from './style';

export default class GenericButton extends Component {
    constructor(props){
        super(props)
        this.state = {
        }
    }

    render(){

        return(
            <TouchableWithoutFeedback onPress={this.props.onPress}>
                <View 
                    style={[
                        styles.genericButton, 
                        {backgroundColor: this.props.buttonColor},
                        this.props.styles && this.props.styles
                    ]}
                >
                    {
                        this.props.loaded ? 
                        <View style={styles.container}>
                            {
                                this.props.hasIcon && 
                                this.props.icon
                            }
                            {this.props.text && <Text style={[styles.genericButtonText, 
                            this.props.textStyle && this.props.textStyle]}>
                                {this.props.text}
                            </Text>}
                        </View>
                        : 
                        <ActivityIndicator size="small" color={this.props.loadingColor}/>
                    }   
                </View>
            </TouchableWithoutFeedback>
        )
    }
}