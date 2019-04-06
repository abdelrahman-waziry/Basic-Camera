import React, {Component} from 'react'
import {View, Text, Image, Platform, ImageBackground} from 'react-native'
import {ImageManipulator} from 'expo'
import {Feather} from '@expo/vector-icons'
import {styles} from './style'

import { STYLE_CONSTANTS } from '../../configs/styles/consts'
import CreatePost from './CreatePost'
import ButtonIcon from '../Buttons/ButtonIcon'

export default class CapturedImage extends Component {
    constructor(props){
        super(props)
        this.state = {
            uri: '',
            products: [],
            base64: '',
        }
    }

    willFocus = this.props.navigation.addListener(
		'willFocus',
		payload => {
			console.log(payload)
		}
	)

    componentWillMount(){
        const { navigation } = this.props
        let type = navigation.getParam('type', '')
        let uri = navigation.getParam('uri', '')
        if(type === 'outfit'){
            this.generateBase64()
        } 
        else {
            this.processCapturedImage(type)
        }

    }
    
    async processCapturedImage(type){
        const { navigation } = this.props
        let uri = navigation.getParam('uri', '')
        const manipResult = await ImageManipulator.manipulate(uri, [], {compress: .4});
        this.setState({ uri: manipResult.uri });
    }

    async generateBase64(){
        const { navigation } = this.props
        let uri = navigation.getParam('uri', '')
        let products = navigation.getParam('products', '')
        var productIDs = []
        products.forEach(product => {
            productIDs.push(product.id)
        })
        this.setState({
            uri: uri,
            products: productIDs
        })
        const manipResult = await ImageManipulator.manipulate(uri,
          [{ resize: { width: STYLE_CONSTANTS.DeviceWidth, height: STYLE_CONSTANTS.DeviceWidth}}], {
              base64: true,
          });
        this.setState({
             base64: manipResult.base64
        });
    }

    render(){
        const { navigation } = this.props
        let type = navigation.getParam('type', '')
        let address = navigation.getParam('address', '')
        return(
            <View style={styles.formViewContainer}>
                <ImageBackground style={{
                    height: STYLE_CONSTANTS.DeviceWidth - 80,
                    width: STYLE_CONSTANTS.DeviceWidth 
                }} source={{uri: this.state.uri}}
                >
                </ImageBackground>
                <CreatePost
                    navigateToLocationPicker={() => {
                        this.props.navigation.navigate('PickLocation', {
                            uri: this.state.uri
                        })
                    }} 
                    navigateToHome={() => {
                        this.props.navigation.navigate('Feed', {
                            refresh: true
                        })
                    }}
                    products={this.state.products}
                    uri={this.state.uri}
                    dissolveDate={this.state.dissolveDate}
                    base64={this.state.base64}
                    address={address}
                />
                <ButtonIcon
                    loaded={true}
                    onPress={() => {
                        this.props.navigation.goBack(null)
                    }}
                    styles={styles.backButton}
                    icon={
                        <Feather name='arrow-left' size={25} color='#fff' />
                    }
                />
            </View>
        )
    }
}