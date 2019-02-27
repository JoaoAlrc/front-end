import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { StatusBar, AsyncStorage } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';

import { UserAPI } from '../../../../services/api';

import {
  Container,
  Logo,
  Input,
  ErrorMessage,
  Button,
  ButtonText,
  SignUpLink,
  SignUpLinkText,
} from '../../../../components/styles';

export default class SignIn extends Component {
  static navigationOptions = {
    header: null,
  };

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
      dispatch: PropTypes.func,
    }).isRequired,
  };

  state = {
    email: '',
    password: '',
    error: '',
  };

  handleEmailChange = (email) => {
    this.setState({ email });
  };

  handlePasswordChange = (password) => {
    this.setState({ password });
  };

  handleCreateAccountPress = () => {
    this.props.navigation.navigate('SignUp');
  };

  handleSignInPress = async () => {
    if (this.state.email.length === 0 || this.state.password.length === 0) {
      this.setState({ error: 'Preencha usuário e senha para continuar!' }, () => false);
    } else {
      try {
        let response = await UserAPI.login(this.state.email, this.state.password)
        await AsyncStorage.setItem('@user:token', response.data.token);
        this.props.navigation.navigate('Main')
      } catch (_err) {
        this.setState({ error: 'Houve um problema com o login, verifique suas credenciais!' });
      }
    }
  };

  render() {
    return (
      <Container>
        <StatusBar hidden />
        <Logo source={require('../../../../../images/white_logo.png')} resizeMode="contain" logoHeight={"30%"} logoMgBtm={"40px"} />
        <Input
          placeholder="E-mail"
          placeholderTextColor="#595959"
          value={this.state.email}
          onChangeText={this.handleEmailChange}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Input
          placeholder="Senha"
          placeholderTextColor="#595959"
          value={this.state.password}
          onChangeText={this.handlePasswordChange}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
        />
        {this.state.error.length !== 0 && <ErrorMessage>{this.state.error}</ErrorMessage>}
        <Button onPress={this.handleSignInPress}>
          <ButtonText>Entrar</ButtonText>
        </Button>
        <SignUpLink onPress={this.handleCreateAccountPress}>
          <SignUpLinkText>Criar conta.</SignUpLinkText>
        </SignUpLink>
      </Container>
    );
  }
}