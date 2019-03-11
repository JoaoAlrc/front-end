import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { StackActions, NavigationActions } from 'react-navigation';
import { RNCamera } from 'react-native-camera';

import {
  Container,
  Logo,
  SuccessMessage,
  Input,
  ErrorMessage,
  Button,
  ButtonText,
  SignInLink,
  SignInLinkText,
} from '../../../../components/styles';

export default class Drink extends Component {
  constructor(props) {
    super(props)

    const [stock, drink] = props.navigation.state.params.drinks
    this.state = {
      stock,
      drink,
      isLoading: true
    }
  }

  logOut = async () => {
    await AsyncStorage.clear()
    this.props.navigation.navigate('Auth')
  }

  takePicture = async () => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options)
      alert(data.uri);
    }
  }

  render() {
    return (
      this.state.isLoading
      ?
      <Container>
        <ActivityIndicator size="large" color="#FFF" animating />
      </Container>
      :
      <Container>
        <Button onPress={this.takePicture}>
          <ButtonText> SNAP </ButtonText>
        </Button>
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