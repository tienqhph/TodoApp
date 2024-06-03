import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {NAME_NAVIGATION} from '../constants/nameNavigator';
import {RouteProp} from '@react-navigation/native';
import {taskModel} from '../model/TaskModel';

export type RootStackParamList = {
  Home: undefined;
  AddTask:
    | undefined
    | {
        editable: boolean;
        datatask: taskModel;
      };
  Search: undefined;
  Login: undefined;
  SignUp: undefined;
  TaskDetail: {
    data: string;
    color: string;
  };
  AllTask:undefined|{
    data:taskModel []
  }
};

export type RootStack = NativeStackNavigationProp<
  RootStackParamList,
  NAME_NAVIGATION.HOME
>;

export type RouterProp = RouteProp<
  RootStackParamList,
  NAME_NAVIGATION.TASKDETAIL
>;
export type RouterPropEditTask = RouteProp<
  RootStackParamList,
  NAME_NAVIGATION.ADD_TASK
>;
export type RouterPropAllTask = RouteProp<
  RootStackParamList,
  NAME_NAVIGATION.ALLTASK
>;
