import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { AsyncStorage, FlatList, View } from 'react-native';
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
  Text
} from '../../../../components/styles';

export default class Narg extends Component {
  constructor(props) {
    super(props)
    const [stock, essence] = props.navigation.state.params.essences
    this.state = {
      stock,
      essence,
      isLoading: false
    }
  }

  renderItem = ({ item }) => {
    return (
      <View>
        {console.tron.log('item', item)}
        <Text>{item.name}</Text>
      </View>
    )
  }

   renderSeparator = () => {
     return (
       <View style={{ height: 1, width: '100%', backgroundColor: '#595959'}}>
       </View>
     )
   }

  render() {
    console.tron.log(this.state.essence)
    return (
      this.state.isLoading
        ?
        <Container>
          <ActivityIndicator size="large" color="#FFF" animating />
        </Container>
        :
        <Container>
          <FlatList
            data={this.state.essence}
            keyExtractor={item => item.id}
            renderItem={item => this.renderItem(item)}
            ItemSeparatorComponent={this.renderSeparator}
          />
          <Button onPress={() => this.props.navigation.navigate('Bar')}>
            <ButtonText>Bar</ButtonText>
          </Button>
        </Container>
    );
  }
}