import React, {Component} from 'react'
import {View, StatusBar, ImageBackground} from 'react-native'
import {ImageManipulator} from 'expo'
import {styles} from './style'

import { STYLE_CONSTANTS } from '../consts'

export default class CapturedImage extends Component {
    constructor(props){
        super(props)
        this.state = {
            uri: '',
        }
    }

    componentDidMount(){
        const { navigation } = this.props
        let type = navigation.getParam('type', '')
        this.processCapturedImage(type)
    }

    async processCapturedImage(type){
        const { navigation } = this.props
        let uri = navigation.getParam('uri', '')
        if(type == 1){
            const manipResult = await ImageManipulator.manipulateAsync(uri, [
                { flip: { horizontal: true } }
            ]);
            this.setState({ uri: manipResult.uri });
        }
        else {
            this.setState({uri: uri})
        }
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
                }} source={{uri: this.state.uri}}
                >
                </ImageBackground>
            </View>
        )
    }
}