import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './HomeScreen.js';
import MovieScreen from './MovieScreen.js';

const MovieNav = createStackNavigator();


export default function MovieNavigator() {
    return (
      <MovieNav.Navigator>
        <MovieNav.Screen 
          name="Home" 
          component={HomeScreen} 
        />
        <MovieNav.Screen 
          name="Movie" 
          component={MovieScreen} 
        />
      </MovieNav.Navigator>
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