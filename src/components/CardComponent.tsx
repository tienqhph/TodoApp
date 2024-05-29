import { View, Text, StyleProp, ViewStyle } from 'react-native'
import React, { ReactNode } from 'react'
import { styles } from '../styles/globalStyle'
interface Props{
    children:ReactNode , 
    bgColor?:string , 
    style?:StyleProp<ViewStyle>
}
const CardComponent = (props:Props) => {
    const {children , bgColor , style}= props
  return (
    <View style = {[  styles.texinput,, style , {backgroundColor:bgColor??undefined}]}>
      {children}
    </View>
  )
}

export default CardComponent