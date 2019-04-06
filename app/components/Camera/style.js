import {StyleSheet, Platform} from 'react-native'
import { STYLE_CONSTANTS } from '../consts';

export const styles = StyleSheet.create({
    actionsContainer: { 
        position: 'absolute',
        bottom: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    actionButton: {
        width: STYLE_CONSTANTS.DeviceWidth / 3,
        height: '100%'
    },
    tabBar: {
        backgroundColor: '#fff',
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        padding: 16,
    },
    activeTab: {
        borderBottomWidth: 1.5,
        borderBottomColor: '#222',
    },
    backButton: {
        position: 'absolute',
        top: 20,
        left: 5,
        width: '15%',
    },
    galleryPostButton: {
        position: 'absolute',
        top: 20,
        right: 5,
        width: '20%'
    },
    formViewContainer: {
        width: '100%',
        height: '100%',
        flexWrap: 'wrap', 
        alignSelf: 'center',
        flexDirection: 'column',
    },
    formContainer: {
        flex: 1,
        flexGrow: 1,
        width: '100%',
        backgroundColor: '#fff',
        alignSelf: 'center',
        flexDirection: 'column',
    },
    formInputGroup: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        alignSelf: 'center',
        flexDirection: 'column',
        marginVertical: 10,
        width: '90%'
    },
    formInputLabel: {
        fontSize: 14,
        marginVertical: 8, 
        fontWeight: 'normal',
        color: '#666',
        fontFamily: STYLE_CONSTANTS.DefaultFont
    },
    formInputStyle: {
        width: '100%',
        borderRadius: 4,
        paddingVertical: Platform.OS == 'ios' ? 15 : 0,
        alignSelf: 'center',
        backgroundColor: '#f2f2f2',
    },
    captionInputStyle: {
        fontFamily: STYLE_CONSTANTS.DefaultFont,
        textAlignVertical: 'top',
        paddingVertical: Platform.OS == 'ios' ? 50 : 15,
        paddingHorizontal: 10
    },
    locationPickerStyle: {
        paddingVertical: 8, 
        flexDirection: 'row', 
        alignItems: 'center'  
    },
    locationTextStyle: {
        fontFamily: STYLE_CONSTANTS.DefaultFont,
        paddingVertical: 10,
        paddingHorizontal: 10
    },
    postButtonStyle: {
        width: null,
        margin: 0,
        flex: 2,
        height: 40,
        borderRadius: 4,
        marginRight: 5,
        marginVertical: 10,
    },
    hashtagText: {
        color: STYLE_CONSTANTS.LightPrimaryColor
    },
    galleryList: {
        justifyContent: 'center',
        flexDirection: 'row',
    },
    galleryImage: {
        height: 90,
        margin: 2,
        borderRadius: 5,
    },
    dissolveButtonContainer: {
        flex: 1,
        height: 40,
        marginVertical: 10,
        justifyContent: 'center',
        alignContent: 'center' 
    },
    dissolveButtonStyle: {
        borderRadius: 4,
        borderColor: 'transparent',
        borderWidth: 0,
        backgroundColor: STYLE_CONSTANTS.LightPrimaryColor,
        fontSize: 13, 
        color: '#fff',
        alignSelf: 'center',
        justifyContent: 'center'
    },
    buttonsContainer: {
        alignSelf: 'center',
        flexDirection: 'row',
        width: '90%'
    }
})