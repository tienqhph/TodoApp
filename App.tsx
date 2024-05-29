import {View, Text, StatusBar} from 'react-native';
import React from 'react';
import HomeScreen from './src/screens/home/HomeScreen';
import {styles} from './src/styles/globalStyle';
import MainNavigation from './src/navigations/MainNavigation';

const App = () => {
  return (
    <>
      <StatusBar
        translucent={true}
        backgroundColor="transparent" 
        
       
      />

      <MainNavigation/>
    </>
  );
};

export default App;
