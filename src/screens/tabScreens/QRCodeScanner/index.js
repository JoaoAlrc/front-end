import React, { Component } from 'react';

import { StatusBar, AsyncStorage } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';

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
} from './styles';

export default class QRCodeScanner extends Component {
  static navigationOptions = {
    header: null,
  };
  state = {
    id: '',
    error: '',
  };

  handleIDChange = (email) => {
    this.setState({ email });
  };

  goBar = async () => {
    if (this.state.email.length === 0 || this.state.password.length === 0) {
      this.setState({ error: 'Preencha ID do bar para continuar!' }, () => false);
    } else {
      try {
        let response = await BarAPI.getBar(this.state.id)
        await AsyncStorage.setItem('@bar:id', response.id.toString());
        //this.props.navigation.navigate('Main')
      } catch (_err) {
        this.setState({ error: 'Houve um problema, verifique o ID!' });
      }
    }
  };

  render() {
    return (
      <Container>
        <Input
          placeholder="E-mail"
          placeholderTextColor="#595959"
          value={this.state.id}
          onChangeText={this.handleIDChange}
          autoCapitalize="none"
          autoCorrect={false}
        />
        {this.state.error.length !== 0 && <ErrorMessage>{this.state.error}</ErrorMessage>}
        <Button onPress={this.goBar}>
          <ButtonText>Entrar</ButtonText>
        </Button>
      </Container>
    );
  }
}