import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import { useNavigation } from '@react-navigation/native'

import LoginScreen from './LoginScreen.js';
import MainScreenTabs from './MainNavigator.js';
import MovieScreen from './MovieScreen.js';

const AppNavigator = createStackNavigator();

// const navigation = useNavigation();

export default function App({ navigation }) {
    return (
        <NavigationContainer>
          <AppNavigator.Navigator initialRouteName = "Login">
            <AppNavigator.Screen 
              name = "Login" 
              component = {LoginScreen} 
            />
            <AppNavigator.Screen 
              name = "Main" 
              component = {MainScreenTabs}
              // options={{
              //   headerRight: () => (
              //       <Button
              //           onPress = {navigation.goBack()}
              //           title="Logout"
              //           color="blue"
              //       />
              //   ),
              //   }}
            />
            <AppNavigator.Screen 
              name = "Movie" 
              component = {MovieScreen} 
            />
          </AppNavigator.Navigator>
        </NavigationContainer>
    );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
