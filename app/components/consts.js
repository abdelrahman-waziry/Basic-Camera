import { StyleSheet, Platform, Dimensions } from 'react-native'

export const STYLE_CONSTANTS = {
    DeviceWidth: Dimensions.get('window').width,
    DeviceHeight: Dimensions.get('window').height,
    DefaultFont: Platform.os == 'ios' ? 'San Francisco' : 'sans-serif',
    FacebookAppID: '685122898359276',
    PrimaryColor: '#2962FF',
    SecondaryColor: '#2979FF',
    DarkPrimaryColor: '#0D47A1',
    DarkSecondaryColor: '#1565C0',
    LightPrimaryColor: '#448AFF',
    LightSecondaryColor: '#82B1FF',
    BackgroundColor: '#E3F2FD',
    GreyBorder: '#D3D3D3',
    Red: '#FF0000',
    LargeTitle: {
        size: 22.5,
        weight: 'normal'
    },
    Title: {
        size: 18.5,
        weight: 'normal'
    },
    Body: {
        size: 14.65,
        weight: 'normal',
    },


}