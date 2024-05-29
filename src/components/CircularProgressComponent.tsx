import { View, Text } from 'react-native'
import React from 'react'
import CircularProgress from 'react-native-circular-progress-indicator'
import { colors } from '../constants/colors'



interface Props {
    value:number , 
    valueSuffix?:string ,  
     maxvalue?:number , 
     color?:string

}
const CircularProgressComponent = (props :Props) => {

    const {value , valueSuffix , maxvalue , color} = props
  return (
    <CircularProgress
    value={value}
    valueSuffix={valueSuffix}
    activeStrokeWidth={12}
    maxValue={maxvalue??100}
    progressValueColor={'#ecf0f1'}
    radius={40}
    activeStrokeColor={color??colors.lightblue}
    duration={2000}
    progressValueStyle={{alignItems: 'flex-end'}}
  />
  )
}

export default CircularProgressComponent