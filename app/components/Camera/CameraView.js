import React from 'react';
import { Text, View, TouchableOpacity, StatusBar } from 'react-native';
import { Camera, Permissions } from 'expo';
import { STYLE_CONSTANTS } from '../consts';
import Feather from '@expo/vector-icons/Feather';
import EmptyState from '../EmptyState/EmptyState';

const DOUBLE_PRESS_DELAY = 300;

export default class CameraView extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      hasCameraPermission: null,
      type: Camera.Constants.Type.back,
	    image: {},
	    isMounted: true,
      flashMode: 'off'
    }
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  async grantCameraPermission(){
	const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  toggleFlash(){
    this.setState({
      flashMode: this.state.flashMode === 'off'
          ? 'on'
          : 'off'
    })
  }

  /**
   * Double Press recognition
   * @param  {Event} e
   */
  handleDoubleTap(e) {
    const now = new Date().getTime();

    if (this.lastImagePress && (now - this.lastImagePress) < DOUBLE_PRESS_DELAY) {
      delete this.lastImagePress;
      this.flipCamera()
    }
    else {
      this.lastImagePress = now;
    }
  }

  flipCamera(){
    this.setState({
        type: this.state.type === Camera.Constants.Type.back
          ? Camera.Constants.Type.front
          : Camera.Constants.Type.back,
      })
  }

  async captureImage(){
    if(this.camera){
      let image = await new Promise(async resolve => {
        await this.camera.takePictureAsync({onPictureSaved : resolve, quality: 1});
        this.camera.pausePreview();
      })
        this.camera.resumePreview();
        console.log(image.uri)
        // this.props.navigateToImage(image.uri, this.state.type)
    }
  }

  render(){
    const { hasCameraPermission } = this.state;
    const style = hasCameraPermission ? null : {flex: 1}
		return (
      <TouchableOpacity 
          activeOpacity={1} 
          onPress={() => {this.handleDoubleTap()}} 
          style={{
            height: STYLE_CONSTANTS.DeviceHeight - StatusBar.currentHeight * 2,
            width: STYLE_CONSTANTS.DeviceWidth,
            marginTop: StatusBar.currentHeight,
            alignSelf: 'center',
            flexDirection: 'column',
          }}
      > 
      <Camera 
        ref={(camera) => {this.camera = camera}} 
        style={{ flex: 1 }}
        ratio='16:9'
        flashMode={this.state.flashMode}
        type={this.state.type}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          {this.props.children}
        </View>
      </Camera>
    </TouchableOpacity>  
		);
    }
}