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

  state = {
  };

  logOut = async () => {
   await AsyncStorage.clear()
   this.props.navigation.navigate('Auth')
  }

  render() {
    return (
      <Container>
        <Button onPress={this.logOut}>
          <ButtonText>Food</ButtonText>
        </Button>
      </Container>
    );
  }
}