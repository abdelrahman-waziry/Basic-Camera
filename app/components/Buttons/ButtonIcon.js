import React, { Component } from 'react'
import GenericButton from './GenericButton'

export default class ButtonIcon extends Component {
    render() {
        return (
            <GenericButton
                loaded={this.props.loaded}
                styles={this.props.styles}
                onPress={this.props.onPress}
                buttonColor={this.props.buttonColor}
                text={this.props.text}
                icon={this.props.icon}
                hasIcon={true}
            />
        )
    }
}