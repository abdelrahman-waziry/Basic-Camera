import { StyleSheet, StatusBar } from 'react-native'
import { STYLE_CONSTANTS } from '../consts';

export const styles = StyleSheet.create({
    loadingContainer: {
        marginTop: STYLE_CONSTANTS.DeviceWidth - StatusBar.currentHeight - 60,
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor: '#rgba(238, 238, 238, .8)',
        borderRadius: 4,
        padding: 16,
    },

})