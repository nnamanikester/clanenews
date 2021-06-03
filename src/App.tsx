import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ThemeProvider} from 'react-native-elements';
import {Provider} from 'react-redux';
import {store} from './state/store';
import NavigationFlow from './navigation';
import theme from './components/theme';

export interface AppProps {}

export interface AppState {}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <SafeAreaProvider>
            <NavigationFlow />
          </SafeAreaProvider>
        </ThemeProvider>
      </Provider>
    );
  }
}

export default App;
