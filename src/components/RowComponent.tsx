import {View, Text, StyleProp, ViewStyle, TouchableOpacity} from 'react-native';
import React, {Children, ReactNode} from 'react';
import {styles} from '../styles/globalStyle';

interface Props {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;

  jutifilecontent?:
    | 'center'
    | 'flex-start'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | undefined;

  onPress?: () => void;
  borerRadius?: number;
}
const RowComponent = (props: Props) => {
  const {children, style, jutifilecontent, onPress, borerRadius} = props;
  return onPress ? (
    <TouchableOpacity
      onPress={() => onPress()}
      style={[
        styles.row, styles.texinput,
        style,
        {
          justifyContent: jutifilecontent ?? 'center',
          borderRadius: borerRadius,
        },
      ]}>
      {children}
    </TouchableOpacity>
  ) : (
    <View
      style={[
        styles.row,
        style,
        {
          justifyContent: jutifilecontent ?? 'center',
          borderRadius: borerRadius,
        },
      ]}>
      {children}
    </View>
  );
};

export default RowComponent;
