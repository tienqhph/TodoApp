import {View, Text, ScrollView, StyleProp, ViewStyle} from 'react-native';
import React, {Children, ReactNode} from 'react';
import {styles} from '../styles/globalStyle';

interface Props {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
}
const ContainerComponent = (props: Props) => {
  const {children, style} = props;
  return (
    <ScrollView contentContainerStyle={[styles.container, style]}>
      {children}
    </ScrollView>
  );
};

export default ContainerComponent;
