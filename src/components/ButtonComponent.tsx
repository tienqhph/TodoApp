import {
  View,
  Text,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import TextComponent from './TextComponent';
import {styles} from '../styles/globalStyle';
import {colors} from '../constants/colors';

interface Props {
  onPress: () => void;
  title: string;
  bgColor?: string;
  icon?: string;
  borderRadius?: number;
  style?: StyleProp<ViewStyle>;
  font?: string;
  showIdicator?: boolean;
  color?: string;
}
const ButtonComponent = (props: Props) => {
  const {
    onPress,
    title,
    bgColor,
    borderRadius,
    icon,
    style,
    font,
    showIdicator,
    color,
  } = props;
  return (
    <TouchableOpacity
      disabled={showIdicator}
      style={[
        {
          borderRadius: borderRadius,
          backgroundColor: bgColor && showIdicator ? colors.gray : bgColor,
          alignItems: 'center',
          justifyContent: 'center',
        },
        style,
      ]}
      onPress={() => onPress()}>
      {showIdicator ? (
        <ActivityIndicator size={16} color={colors.white} />
      ) : (
        <TextComponent text={title} font={font} color={color} />
      )}
    </TouchableOpacity>
  );
};

export default ButtonComponent;
