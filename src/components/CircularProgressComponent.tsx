import {View, Text} from 'react-native';
import React from 'react';
import CircularProgress from 'react-native-circular-progress-indicator';
import {colors} from '../constants/colors';

interface Props {
  value: number;
  valueSuffix?: string;
  maxvalue?: number;
  color?: string;
  radius?:number
}
const CircularProgressComponent = (props: Props) => {
  const {value, valueSuffix, maxvalue, color , radius} = props;
  return (
    <CircularProgress
      value={value}
      valueSuffix={valueSuffix}
      activeStrokeWidth={10}
      maxValue={maxvalue ?? 100}
      progressValueColor={'#ecf0f1'}
      radius={radius?radius:40}
      
      activeStrokeColor={color ?? colors.lightblue}
      duration={2000}
      progressValueStyle={{alignItems: 'flex-end' , fontSize:16}}
    />
  );
};

export default CircularProgressComponent;
