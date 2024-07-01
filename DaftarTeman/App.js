import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './assets/Screens/HomeScreen';
import FriendsListScreen from './assets/Screens/FriendsListScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="FriendsList" component={FriendsListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}