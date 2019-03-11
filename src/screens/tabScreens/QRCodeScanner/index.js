import React, { Component } from 'react';

import { StatusBar, AsyncStorage, StyleSheet } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { RNCamera } from 'react-native-camera';

import { BarAPI } from '../../../services/api';

import {
  Container,
  Logo,
  Input,
  ErrorMessage,
  Button,
  ButtonText,
  SignUpLink,
  SignUpLinkText,
} from '../../../components/styles'

export default class QRCodeScanner extends Component {
  static navigationOptions = {
    header: null,
  };
  state = {
    id: null,
    error: '',
  };

  handleIDChange = (id) => {
    this.setState({ id });
  };

  goBar = async () => {
    if (this.state.id === null) {
      this.setState({ error: 'Preencha ID do bar para continuar!' }, () => false);
    } else {
      try {
        let bar = await BarAPI.getBar(this.state.id)
        await AsyncStorage.setItem('@bar:id', bar.id.toString());
        this.props.navigation.navigate('Bar')
      } catch (_err) {
        this.setState({ error: 'Houve um problema, verifique o ID!' });
      }
    }
  };

  takePicture = async () => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options)
      alert(data);
    }
  }

  render() {
    return (
      <Container>
        <Input
          placeholder="ID da mesa"
          placeholderTextColor="#595959"
          value={this.state.id}
          onChangeText={this.handleIDChange}
          autoCapitalize="none"
          autoCorrect={false}
        />
        {this.state.error.length !== 0 && <ErrorMessage>{this.state.error}</ErrorMessage>}
        <Button onPress={this.goBar}>
          <ButtonText>ID da mesa!</ButtonText>
        </Button>
        {/* <RNCamera
          ref={camera => {
            this.camera = camera;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          autoFocus={RNCamera.Constants.AutoFocus.on}
          flashMode={RNCamera.Constants.FlashMode.off}
          permissionDialogTitle={"Permission to use camera"}
          permissionDialogMessage={
            "We need your permission to use your camera phone"
          }
        />
        <Button onPress={this.takePicture}>
          <ButtonText> SNAP </ButtonText>
        </Button> */}
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  }
});