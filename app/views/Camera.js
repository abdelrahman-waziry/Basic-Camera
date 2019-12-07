import React from 'react';
import { View } from 'react-native'
import CameraView from '../components/Camera/CameraView'
import CameraActions from '../components/Camera/CameraActions'
import CameraSettings from '../components/Camera/CameraSettings';

export default class Camera extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      flashMode: 'off',
      type: 0,
    }
  }

  componentDidMount(){
    this.setState({
      flashMode: this.cameraView.state.flashMode,
      type: this.cameraView.state.type
    })
  }

  willFocus = this.props.navigation.addListener(
		'willFocus',
		payload => {
			this.cameraView.setState({
				showLoading: false
			}) 
		}
	)

  render() {
    return(
      <View style={{flex: 1, backgroundColor: '#000'}}>
        <CameraSettings/>
        <CameraView 
          navigateToImage={(uri, type) => {
            this.props.navigation.navigate('CapturedImage', {
              uri: uri,
              type: type
          })}} ref={(cameraView) => {this.cameraView = cameraView}}
        >
          <CameraActions
            flashMode={this.state.flashMode}
            type={this.state.type}
            captureImage={() => {
              this.cameraView.captureImage()
            }}
            flipCamera={() => {
              this.setState({
                flashMode: this.state.type === 0 ? 1 : 0
              })
              this.cameraView.flipCamera()
            }}
            toggleFlash={() => {
              this.setState({
                flashMode: this.state.flashMode === 'on' ? 'off' : 'on'
              })
              this.cameraView.toggleFlash()
            }}
        />
        </CameraView>
      </View>
    )
  }
}