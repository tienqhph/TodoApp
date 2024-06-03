import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/home/HomeScreen';
import {NAME_NAVIGATION} from '../constants/nameNavigator';
import TaskScreen from '../screens/tasks/TaskScreen';

import LoginScreen from '../screens/auth/LoginScreen';

import auth from '@react-native-firebase/auth';
import SignUpScreen from '../screens/auth/SignUpScreen';
import TaskDetailScreen from '../screens/tasks/TaskDetailScreen';
import AllTaskScreen from '../screens/tasks/AllTaskScreen';

const StackNavigation = () => {
  const Stack = createStackNavigator();
  const [islogin, setislogin] = useState(false);
  useEffect(() => {
    auth().onAuthStateChanged(user => {
      if (user) {
        setislogin(true);
      } else {
        setislogin(false);
      }
    });
  }, []);

  const HomeStack = (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={NAME_NAVIGATION.HOME}>
      <Stack.Screen component={HomeScreen} name={NAME_NAVIGATION.HOME} />
      <Stack.Screen component={TaskScreen} name={NAME_NAVIGATION.ADD_TASK} />
 
      <Stack.Screen
        component={TaskDetailScreen}
        name={NAME_NAVIGATION.TASKDETAIL}
      />
       <Stack.Screen component={AllTaskScreen} name={NAME_NAVIGATION.ALLTASK} />
    </Stack.Navigator>
  );

  const AuthStack = (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen component={LoginScreen} name={NAME_NAVIGATION.LOGIN} />
      <Stack.Screen component={SignUpScreen} name={NAME_NAVIGATION.SIGNUP} />
    </Stack.Navigator>
  );
  return islogin ? HomeStack : AuthStack;
};

export default StackNavigation;
