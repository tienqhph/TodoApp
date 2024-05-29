import {View, Text, StyleProp, ViewStyle} from 'react-native';
import React, { ReactNode } from 'react';
import TextComponent from './TextComponent';
import { styles } from '../styles/globalStyle';

interface Props {
  title: string;
  jutificontent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | undefined; 
     icon?: ReactNode , 
     fldicoration?:"row" | "column" | "row-reverse" | "column-reverse" | undefined , 
     size?:number , 
     style?:StyleProp<ViewStyle>
}
const HeaderAppComponent = (props:Props) => {


    const {title , jutificontent , icon , fldicoration , style} = props
  return icon?(
    <View style = {[styles.headeraddnewTask , {justifyContent:jutificontent??'center', flexDirection:fldicoration??undefined} , style] }>
        {icon}
        <TextComponent text={title} textalight ='center'flex = {1} />
    </View>
  ):(
    <View style = {[styles.headeraddnewTask]}>
            <TextComponent text={title}/>
    </View>
  )
};

export default HeaderAppComponent;
