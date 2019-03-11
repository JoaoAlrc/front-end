import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from '../redux/reducer';
import Routes from './routes';
import Reactotron from 'reactotron-react-native';

const store = createStore(reducer);

const navigationPersistenceKey = __DEV__ ? "NavigationStateDEV" : null;

console.tron = Reactotron
    .configure()
    .useReactNative()
    .connect()

const App = () => <Provider store={store}>
    <Routes
        persistenceKey={navigationPersistenceKey}
        // renderLoadingExperimental={() => <ActivityIndicator />} 
        />
</Provider>;

export default App;