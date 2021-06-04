import 'react-native-gesture-handler';
import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'react-native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import SingleNewsScreen from '../screens/SingleNewsScreen';
import {store, Dispatch} from '../state/store';
import CreateNewsScreen from '../screens/CreateNews';
import EditNewsScreen from '../screens/EditNews';

// Initalize the stack navigation
const Stack = createStackNavigator();

export interface NavigationFlowProps {}

const NavigationFlow: React.FC<NavigationFlowProps> = () => {
  const dispatch: Dispatch = store.dispatch;

  React.useEffect(() => {
    // Fetches offline news when loading app
    (async () => {
      const news = await AsyncStorage.getItem('@Clane/news');
      if (news) {
        dispatch.news.setNews(JSON.parse(news));
      }
    })();
  }, []);

  return (
    <>
      <StatusBar backgroundColor="#fff" barStyle="light-content" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            header: () => null,
            // gestureDirection: "horizontal",
            gestureEnabled: true,
            ...TransitionPresets.SlideFromRightIOS,
          }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="SingleNews" component={SingleNewsScreen} />
          <Stack.Screen name="CreateNews" component={CreateNewsScreen} />
          <Stack.Screen name="EditNews" component={EditNewsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default NavigationFlow;
