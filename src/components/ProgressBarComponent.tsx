import {View, Text, DimensionValue} from 'react-native';
import React from 'react';
import RowComponent from './RowComponent';
import TextComponent from './TextComponent';

interface Props {
  color?: string;
  percent: DimensionValue;
  size?: number;
}
const ProgressBarComponent = ({color, percent, size}: Props) => {
  return (
    <View  style = {{paddingTop:12 , paddingBottom:24}}>
      <View
        style={{
          backgroundColor: 'rgba(0,0,0,0.4)',
          height: 8,
          borderRadius: 6,
        }}>
        <View
          style={{
            backgroundColor: color ?? 'rgba(33,150,243,0.8)',
            height: 8,
            width: percent,
            borderRadius: 16,
          }}></View>
      </View>
      <RowComponent jutifilecontent='space-between'>
        <TextComponent text='Progress' size={12}/>
        <TextComponent text={`${percent}`}/>
      </RowComponent>

    </View>
  );
};

export default ProgressBarComponent;
