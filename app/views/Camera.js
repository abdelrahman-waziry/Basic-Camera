import React from 'react';
import { View } from 'react-native'
import CameraView from '../components/Camera/CameraView'
import CameraActions from '../components/Camera/CameraActions'

export default class Camera extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      cameraViewState: {}
    }
  }

  componentDidMount(){
    this.setState({cameraViewState: this.cameraView.state})
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
        <CameraView 
          navigateToImage={(uri, type) => {
            this.props.navigation.navigate('CapturedImage', {
              uri: uri,
              type: type
          })}} ref={(cameraView) => {this.cameraView = cameraView}}
        >
          <CameraActions
            cameraViewState={this.state.cameraViewState}
            captureImage={() => {
              this.cameraView.captureImage()
            }}
            flipCamera={() => {
              this.cameraView.flipCamera()
            }}
            toggleFlash={() => {
              this.cameraView.toggleFlash()
            }}
        />
        </CameraView>
      </View>
    )
  }
}