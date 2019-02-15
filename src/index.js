import React from 'react';

import Routes from './routes';
import Reactotron from 'reactotron-react-native';

console.tron = Reactotron
.configure()
.useReactNative()
.connect()

const App = () => <Routes />;

export default App;