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

  render() {
    return(
      <View style={{flex: 1, backgroundColor: '#000'}}>
        <CameraView 
          navigateToImage={(uri, type) => {
            this.props.navigateToImage(uri, type)
            }} ref={(cameraView) => {this.cameraView = cameraView}}
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