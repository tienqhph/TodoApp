import {View, Text, ImageBackground, TouchableOpacity} from 'react-native';
import React, {ReactNode} from 'react';

interface Props {
  color?: string;
  children: ReactNode;
  onpress?: () => void;
}
const ImageCardComponent = (props: Props) => {
  const {color, children, onpress} = props;
  return onpress ? (
    <TouchableOpacity>
      <ImageBackground
        source={require('./../assets/image/bg_card.png')}
        style={{borderRadius: 12}}
        imageStyle={{borderRadius: 12}}>
        <View
          style={{
            backgroundColor: color ?? 'rgba(113,77,217,0.8)',
            borderRadius: 12,
            padding: 12,
          }}>
          {children}
        </View>
      </ImageBackground>
    </TouchableOpacity>
  ) : (
    <ImageBackground
      source={require('./../assets/image/bg_card.png')}
      style={{borderRadius: 12}}
      imageStyle={{borderRadius: 12}}>
      <View
        style={{
          backgroundColor: color ?? 'rgba(113,77,217,0.8)',
          borderRadius: 12,
          padding: 12,
        }}>
        {children}
      </View>
    </ImageBackground>
  );
};

export default ImageCardComponent;
