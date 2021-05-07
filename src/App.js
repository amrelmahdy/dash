import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './store';
import Navigation from './navigation';
import {configureAxiosInterceptors} from './api/AxiosInstance';
import {NavigationServices} from './api/NavigationService';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Platform, StatusBar} from 'react-native';
import RNBootSplash from 'react-native-bootsplash';

// if (__DEV__) {
//   import('./../ReactotronConfig').then(() =>
//     // eslint-disable-next-line no-console
//     console.log('Reactotron Configured'),
//   );
// }

if (__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'));
}

const App = () => {
  useEffect(() => {
   
    // Configure axios with auth token
    configureAxiosInterceptors();
  }, []);

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <StatusBar
            barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
          />

          <Navigation
            ref={ref => NavigationServices.setTopLevelNavigator(ref)}
          />
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
