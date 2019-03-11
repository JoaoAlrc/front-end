import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { AsyncStorage, ActivityIndicator } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';

import { BarAPI } from '../../../services/api';

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

class Bar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: true
    }
  }

  componentDidMount() {
    this.barApi()
  }

  barApi = async () => {
    try {
      let barId = parseInt(await AsyncStorage.getItem('@bar:id')),
        essence = [],
        essenceDetails = [],
        drink = [],
        drinkDetails = [],
        food = [],
        foodDetails = []

      Promise.all([
        await BarAPI.getStock(barId),
        await BarAPI.getProducts()
      ]).then((results) => {
        try {
          const [stocks, products] = results
          essence = stocks.data.filter(i => {
            return i.category_id === 1
          })
          drink = stocks.data.filter(i => {
            return i.category_id === 2
          })
          food = stocks.data.filter(i => {
            return i.category_id === 3
          })
          essenceDetails = products.data.filter(essence => {
            return essence.category_id === 1
          })
          drinkDetails = products.data.filter(drink => {
            return drink.category_id === 2
          })
          foodDetails = products.data.filter(food => {
            return food.category_id === 3
          })
          this.setState({
            essences: [
              essence,
              essenceDetails
            ],
            drinks: [
              drink,
              drinkDetails
            ],
            foods: [
              food,
              foodDetails
            ]
          })
        } catch (error) {
          alert(error)
        }
      })
        .finally(_ => {
          this.setState({ isLoading: false })
        })
    } catch (error) {
      alert(error)
    }
  }

  openList = async (type) => {
    const { essences, drinks, foods } = this.state
    switch (type) {
      case 'narg':
        this.props.navigation.navigate('Narguilê', { essences })
        break;
      case 'drink':
        this.props.navigation.navigate('Bebidas', { drinks })
        break;
      case 'food':
        this.props.navigation.navigate('Comidas', { foods })
        break;

      default:
        break;
    }
  }

  render() {
    console.tron.log(this.state)
    return (
      this.state.isLoading
        ?
        <Container>
          <ActivityIndicator size="large" color="#FFF" animating />
        </Container>
        :
        <Container>
          <Button onPress={() => this.openList('narg')}>
            <ButtonText>Narg</ButtonText>
          </Button>
          <Button onPress={() => this.openList('drink')}>
            <ButtonText>Drink</ButtonText>
          </Button>
          <Button onPress={() => this.openList('food')}>
            <ButtonText>Food</ButtonText>
          </Button>
        </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const { bar } = state
  return { bar }
};

export default connect(mapStateToProps)(Bar);