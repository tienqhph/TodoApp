import { View, Text, StyleProp, ViewStyle, TouchableOpacity } from 'react-native'
import React, { ReactNode } from 'react'
import { styles } from '../styles/globalStyle'
interface Props{
    children:ReactNode , 
    bgColor?:string , 
    style?:StyleProp<ViewStyle>
  onpress?:()=>void
}
const CardComponent = (props:Props) => {
    const {children , bgColor , style  , onpress}= props
  return onpress? (
 <TouchableOpacity onPress={onpress}>
     <View style = {[  styles.texinput,, style , {backgroundColor:bgColor??undefined}]}>
      {children}
    </View>
 </TouchableOpacity>
  ): (
    <View style = {[  styles.texinput,, style , {backgroundColor:bgColor??undefined}]}>
      {children}
    </View>
  )
}

export default CardComponent