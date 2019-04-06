import { StyleSheet, Platform } from 'react-native'
import { STYLE_CONSTANTS } from '../consts';

export const styles = StyleSheet.create({
    genericButton: {
        flex: 0,
        paddingVertical: 6,
        paddingHorizontal: 4,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 25,
        margin: 5,
        width: '90%'
    },
    genericButtonText: {
        color: '#fff',
        alignSelf: 'center',
        fontFamily: STYLE_CONSTANTS.DefaultFont
    },
    genericButtonTextWhenLoading: {
        paddingVertical: 6,
        paddingHorizontal: 4,
        color: '#fff',
        alignSelf: 'center',
        fontFamily: STYLE_CONSTANTS.DefaultFont
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },
})