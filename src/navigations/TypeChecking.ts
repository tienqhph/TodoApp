import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NAME_NAVIGATION } from '../constants/nameNavigator';
import { RouteProp } from '@react-navigation/native';


export  type RootStackParamList = {
    Home:undefined , 
    AddTask:undefined , 
    Search:undefined,
    Login:undefined , 
    SignUp:undefined , 
    TaskDetail:{
        data:string , 
        color:string
    },

}



export type  RootStack = NativeStackNavigationProp<RootStackParamList , NAME_NAVIGATION.HOME>

export  type RouterProp = RouteProp< RootStackParamList , NAME_NAVIGATION.TASKDETAIL>