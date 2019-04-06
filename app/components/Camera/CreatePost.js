import React, { Component } from 'react'
import { View, TextInput, Text, Platform, TouchableOpacity, Alert, ToastAndroid, ScrollView, Keyboard } from 'react-native'
import { Location, Permissions, Linking, IntentLauncherAndroid } from 'expo'
import ParsedText from 'react-native-parsed-text'
import DatePicker from 'react-native-datepicker'
import store from 'react-native-simple-store'
import { Picker } from 'react-native-picker-dropdown'
import { showMessage } from 'react-native-flash-message';
import Feather from '@expo/vector-icons/Feather';

import GenericButton from '../Buttons/GenericButton'
import { styles } from './style'
import { STYLE_CONSTANTS } from '../../configs/styles/consts'
import { NETWORK } from '../../configs/NetworkHandler'

export default class CreatePost extends Component {
    constructor(props) {
        super(props)
        this.state = {
            circles: [],
            topics: [],
            caption: '',
            loaded: true,
            activeCircle: null,
            location: null,
            keyboardHeight: 0,
            address: null,
            dissolveDate: null,
        }
        this._keyboardDidShow = this._keyboardDidShow.bind(this)
        this._keyboardDidHide = this._keyboardDidHide.bind(this)
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.hasOwnProperty('address')){
            this.setState({
                address: nextProps.address
            })
        }
    }

    componentWillMount() {
        this.fetchCirlces()
        this.fetchTopics()
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    }

    _keyboardDidShow(e) {
        this.setState({keyboardHeight: e.endCoordinates.height})
    }
    
    _keyboardDidHide(){
        this.setState({keyboardHeight: 0})
    }

    updateAddress(address){
        this.setState({
            address: address
        })
    }

    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
          Platform.OS == 'ios' ? Alert.alert('', "Permission to access location was denied") :
          ToastAndroid.show("Permission to access location was denied", ToastAndroid.SHORT)
        }
        try {
            const location = await Location.getCurrentPositionAsync({
                enableHighAccuracy: true
            })
    
            this.setState({ 
                location: {
                    latitude: Number(location.coords.latitude).toFixed(9),
                    longitude: Number(location.coords.longitude).toFixed(9)
                } 
            }, () => {
                this._attemptReverseGeocodeAsync()            
            })
        } catch (error) {
            Alert.alert(
                'Location Request',
                'Your location is needed to post a new photo.',
                [
                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    {text: 'Enable', onPress: () => 
                        Platform.OS == 'ios' ? 
                        Linking.openURL('App-Prefs:root=Privacy&path=LOCATION')
                        : IntentLauncherAndroid.startActivityAsync(
                            IntentLauncherAndroid.ACTION_LOCATION_SOURCE_SETTINGS,
                        ).then(() => {
                            this._getLocationAsync()
                        })
                    },
                ],
                { cancelable: false }
            )
        }
    }

    fetchCirlces() {
        store.get('circles').then(circles => {
            this.setState({
                circles: circles,
            })
        })
    }

    _attemptReverseGeocodeAsync = async () => {
        try {
            let result = await Location.reverseGeocodeAsync(this.state.location)
            this.setState({
                address: result[0].name
            })
        } catch (error) {
            console.log(error)
        }
    }

    fetchTopics(){
        store.get('accessToken').then(token => {
            NETWORK.fetchTopics(token, (data) => {
                this.setState({topics: data})
            }, (error) => {
                console.log(error)
            })
        })
    }

    
    submitToCircle(id, token){
        var body = new FormData()
        body.append('circles[]', this.state.activeCircle.id ? this.state.activeCircle.id : 0)
        NETWORK.addActivityToCirlce(token, id, body, (data) => {
            console.log(data)
        }, (error) => {
            console.log(error)
        })
    }
    

    submitPost() {
        this.setState({ loaded: false })
        let formData = new FormData()
        let localUri = this.props.uri;
        let filename = localUri.split('/').pop();
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`

        formData.append('images[]', {
            uri: localUri,
            name: filename,
            type: type
        })
        
        if(this.state.location){
            formData.append('latitude', this.state.location.latitude)
            formData.append('longitude', this.state.location.longitude)
            formData.append('place_name', this.state.address)
        }

        formData.append('caption', this.state.caption)
        formData.append('dissolves_at', this.state.dissolveDate)

        store.get('accessToken').then(token => {
            NETWORK.createPost(token, formData, (data) => {
                if(this.state.activeCircle.id !== 0){
                    this.submitToCircle(data.activity.id, token)
                }
                this.setState({ loaded: true })
                this.props.navigateToHome()
            }, (error) => {
                showMessage({
                    message: "Couldn't connect to the server, please try again",
                    type: "danger",
                    position: {bottom: 40},
                    icon: { icon: "warning", position: "left" }
                })
                this.setState({ loaded: true })
            })
        })
    }

    submitOutfit(){     
        this.setState({ loaded: false })
        var body = {
            cover: this.props.base64.replace(/\r?\n|\r/g, ''),
            products: this.props.products,
            name: this.state.caption
        }

        store.get('accessToken').then(token => {
            store.get('user').then(user => {
                NETWORK.postResource(token, `v1/users/${user.id}/outfits`, JSON.stringify(body), (data) => {
                    if(this.state.activeCircle.id !== 0) {
                        this.submitToCircle(data.activity.id, token)
                    }
                    this.setState({ loaded: true })
                    this.props.navigateToHome()
                }, (error) => {
                    showMessage({
                        message: "Couldn't connect to the server, please try again",
                        type: "danger",
                        position: {bottom: 40},
                        icon: { icon: "warning", position: "left" }
                    })
                    this.setState({ loaded: true })
                })
            })
        })
        
    }

    render() {
        return (
            <ScrollView style={styles.formContainer}>
                <View style={styles.formInputGroup}>
                    <Text style={styles.formInputLabel}>
                        Select a circle
                    </Text>
                    <Picker
                        selectedValue={this.state.activeCircle}
                        onValueChange={(circle) => {this.setState({activeCircle: circle})}}
                        mode="dropdown"
                        style={styles.formInputStyle}
                        textStyle={{color: '#666'}}
                    >
                        <Picker.Item label='Public' value={0}/>
                        {this.state.circles.map((circle, index) => 
                            <Picker.Item key={index} label={circle.name} value={circle.id}/>
                        )}
                    </Picker>
                </View>
                <View style={styles.formInputGroup}>
                    <Text style={styles.formInputLabel}>
                        Pick a location
                    </Text>
                    <View style={[styles.formInputStyle, styles.locationPickerStyle]}>
                        <Text style={[styles.locationTextStyle ,{width: '87%', textAlign: 'left'}]}>
                            {this.state.address ? this.state.address : 'Pick a location'}
                        </Text>
                        <TouchableOpacity onPress={() => {
                            this.props.navigateToLocationPicker()
                        }}>
                            <Feather name='map' color='#888' size={25}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.formInputGroup}>
                    <TextInput
                        placeholder='Write a caption'
                        onChangeText={(caption) => { this.setState({ caption: caption }) }}
                        placeholderTextColor='#999'
                        style={[styles.formInputStyle, styles.captionInputStyle, {marginBottom: this.state.keyboardHeight}]}
                        multiline={true}
                        blurOnSubmit={true}
                        ref={(caption) => {this.caption = caption}}
                        onEndEditing={() => {
                            this.caption.blur()
                        }}
                        underlineColorAndroid='transparent'
                        numberOfLines={3}
                    >
                        <ParsedText
                            parse={
                                [
                                    { pattern: /#[^\s!@#$%^&*()=+.\/,\[{\]};:'\"?><]+/, style: styles.hashtagText },
                                ]
                            }
                            childrenProps={{ allowFontScaling: false }}
                        >
                            {this.state.caption}
                        </ParsedText>
                    </TextInput>
                </View>
                <View style={styles.buttonsContainer}>
                    <GenericButton
                        onPress={() => {
                            this.props.products.length > 0 ? this.submitOutfit() : this.submitPost()
                        }}
                        styles={styles.postButtonStyle}
                        textStyle={{ fontSize: 15 }}
                        loaded={this.state.loaded}
                        loadingColor='#fff'
                        buttonColor={STYLE_CONSTANTS.LightPrimaryColor}
                        text='Post'
                    />
                    <DatePicker
                        style={styles.dissolveButtonContainer}
                        date={this.state.dissolveDate}
                        mode="datetime"
                        placeholder='Autobomb'
                        format="YYYY-MM-DD HH:mm:ss"
                        androidMode='spinner'
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                            dateInput: styles.dissolveButtonStyle,
                            dateText: {color: '#fff', fontSize: 13, textAlign: "center"}
                        }}
                        iconComponent={() => false}
                        onDateChange={(date) => { 
                            this.setState({ dissolveDate: date }) 
                        }}
                    />
                </View>
            </ScrollView>
        )
    }
}