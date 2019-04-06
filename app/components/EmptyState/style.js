import {StyleSheet} from 'react-native'
import { STYLE_CONSTANTS } from '../consts'

export const styles = StyleSheet.create({
    emptyStateContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyStateMessage: {
        marginVertical: 20,
        color: '#444',
        fontFamily: STYLE_CONSTANTS.DefaultFont
    }

})