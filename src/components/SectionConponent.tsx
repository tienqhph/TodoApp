import {View, Text, StyleProp, ViewStyle, TouchableOpacity} from 'react-native';
import React, {ReactNode} from 'react';
import {styles} from '../styles/globalStyle';

interface Props {
  children: ReactNode;

  style?: StyleProp<ViewStyle>;
  onpress?: () => void;
}
const SectionConponent = (props: Props) => {
  const {children, style, onpress} = props;
  return onpress ? (
    <TouchableOpacity style={[styles.section, style]} onPress={onpress}>
      <View >{children}</View>
    </TouchableOpacity>
  ) : (
    <View style={[styles.section, style]}>{children}</View>
  );
};

export default SectionConponent;
