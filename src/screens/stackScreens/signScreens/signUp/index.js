import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { StatusBar } from 'react-native';

import { UserAPI } from '../../../../services/api';
import { StackActions, NavigationActions } from 'react-navigation';

import {
  ScrollContainer,
  Logo,
  SuccessMessage,
  Input,
  ErrorMessage,
  Button,
  ButtonText,
  SignUpLink,
  SignUpLinkText,
} from '../../../../components/styles';
import { ScrollView } from 'react-native-gesture-handler';

export default class SignUp extends Component {
  static navigationOptions = {
    header: null,
  };

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
      dispatch: PropTypes.func,
      goBack: PropTypes.func,
    }).isRequired,
  };

  state = {
    name: '',
    surname: '',
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
    birthdate: '',
    cpf: '',
    address: '',
    addressNum: '',
    neighborhood: '',
    city: '',
    state: '',
    zipCode: '',
    error: '',
    success: '',
  };

  handleInputChange = (input) => {
    switch (input) {
      case 'name':
        this.setState({ name: input });
        break;
      case 'surname':
        this.setState({ surname: input });
        break;
      case 'username':
        this.setState({ username: input });
        break;
      case 'email':
        this.setState({ email: input });
        break;
      case 'password':
        this.setState({ password: input });
        break;
      case 'password_confirmation':
        this.setState({ password_confirmation: input });
        break;
      case 'birthdate':
        this.setState({ birthdate: input });
        break;
      case 'cpf':
        this.setState({ cpf: input });
        break;
      case 'address':
        this.setState({ address: input });
        break;
      case 'addressNum':
        this.setState({ addressNum: input });
        break;
      case 'neighborhood':
        this.setState({ neighborhood: input });
        break;
      case 'city':
        this.setState({ city: input });
        break;
      case 'state':
        this.setState({ state: input });
        break;
      case 'zipCode':
        this.setState({ zipCode: input });
        break;
      default: break;
    }
  };

  handleBackToLoginPress = () => {
    this.props.navigation.goBack();
  };

  handleSignUpPress = async () => {
    if (this.state.email.length === 0 || this.state.password.length === 0) {
      this.setState({ error: 'Preencha todos os campos para continuar!' }, () => false);
    } else {
      try {
        await api.post('/users', {
          username: this.state.username,
          email: this.state.email,
          password: this.state.password,
        });

        this.setState({ success: 'Conta criada com sucesso! Redirecionando para o login', error: '' });

        setTimeout(this.goToLogin, 2500);
      } catch (_err) {
        this.setState({ error: 'Houve um problema com o cadastro, verifique os dados preenchidos!' });
      }
    }
  };

  goToLogin = () => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'SignIn' }),
      ],
    });
    this.props.navigation.dispatch(resetAction);
  }

  render() {
    return (
      <ScrollContainer>
        <StatusBar hidden />
        <Logo source={require('../../../../../images/white_logo.png')}
         resizeMode="contain" 
         logoHeight={"10%"}
         logoMgBtm={40}
         logoMgTop
         />
        {this.state.success.length !== 0 && <SuccessMessage>{this.state.success}</SuccessMessage>}
        <Input
          placeholder="Nome de usuário"
          placeholderTextColor="#595959"
          value={this.state.username}
          onChangeText={() => this.handleInputChange('username')}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Input
          placeholder="Nome"
          placeholderTextColor="#595959"
          value={this.state.name}
          onChangeText={() => this.handleInputChange('name')}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Input
          placeholder="Sobrenome"
          placeholderTextColor="#595959"
          value={this.state.surname}
          onChangeText={() => this.handleInputChange('surname')}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Input
          placeholder="Data de Nascimento"
          placeholderTextColor="#595959"
          value={this.state.birthdate}
          onChangeText={() => this.handleInputChange('birthdate')}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Input
          placeholder="CPF"
          placeholderTextColor="#595959"
          value={this.state.cpf}
          onChangeText={() => this.handleInputChange('cpf')}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Input
          placeholder="CEP"
          placeholderTextColor="#595959"
          value={this.state.zipCode}
          onChangeText={() => this.handleInputChange('zipCode')}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Input
          placeholder="Endereço"
          placeholderTextColor="#595959"
          value={this.state.address}
          onChangeText={() => this.handleInputChange('address')}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Input
          placeholder="Complemento"
          placeholderTextColor="#595959"
          value={this.state.addressNum}
          onChangeText={() => this.handleInputChange('addressNum')}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Input
          placeholder="Bairro"
          placeholderTextColor="#595959"
          value={this.state.neighborhood}
          onChangeText={() => this.handleInputChange('neighborhood')}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Input
          placeholder="Cidade"
          placeholderTextColor="#595959"
          value={this.state.city}
          onChangeText={() => this.handleInputChange('city')}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Input
          placeholder="Estado"
          placeholderTextColor="#595959"
          value={this.state.state}
          onChangeText={() => this.handleInputChange('state')}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Input
          placeholder="E-mail"
          placeholderTextColor="#595959"
          value={this.state.email}
          onChangeText={() => this.handleInputChange('email')}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Input
          placeholder="Senha"
          placeholderTextColor="#595959"
          value={this.state.password}
          onChangeText={() => this.handleInputChange('password')}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
        />
        <Input
          placeholder="Confirmação de Senha"
          placeholderTextColor="#595959"
          value={this.state.password_confirmation}
          onChangeText={() => this.handleInputChange('password_confirmation')}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
        />
        {this.state.error.length !== 0 && <ErrorMessage>{this.state.error}</ErrorMessage>}
        <Button onPress={this.handleSignUpPress}>
          <ButtonText>Criar conta</ButtonText>
        </Button>
        <SignUpLink onPress={this.handleBackToLoginPress}>
          <SignUpLinkText>Voltar ao login</SignUpLinkText>
        </SignUpLink>
      </ScrollContainer>
    );
  }
}