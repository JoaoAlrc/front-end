import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { AsyncStorage } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';

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

export default class Food extends Component {
  constructor(props) {
    super(props)

    const [stock, food] = props.navigation.state.params.foods
    this.state = {
      stock,
      food,
      isLoading: false
    }
  }

  logOut = async () => {
   await AsyncStorage.clear()
   this.props.navigation.navigate('Auth')
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
        <Button onPress={this.logOut}>
          <ButtonText>Food</ButtonText>
        </Button>
      </Container>
    );
  }
}