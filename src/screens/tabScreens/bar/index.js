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
} from '../../../components/styles';

export default class Main extends Component {

  state = {
  };

  openList = async () => {
    switch (type) {
      case 'food':
        this.props.navigation.navigate('Comidas')
        break;
    
      default:
        break;
    }
  }

  render() {
    return (
      <Container>
        <Button onPress={this.openList('narg')}>
          <ButtonText>Narg</ButtonText>
        </Button>
        <Button onPress={this.openList('drink')}>
          <ButtonText>Drink</ButtonText>
        </Button>
        <Button onPress={this.openList('food')}>
          <ButtonText>Food</ButtonText>
        </Button>
      </Container>
    );
  }
}