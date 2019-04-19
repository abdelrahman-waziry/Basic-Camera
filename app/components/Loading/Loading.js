import React, {Component} from 'react'
import {View, ActivityIndicator} from 'react-native'
import { styles } from './style';


export default class Loading extends Component {
    render(){
        return(
            <View style={styles.loadingContainer}>
                <ActivityIndicator color='#222' size={40}/>
            </View>
        )
    }
} 