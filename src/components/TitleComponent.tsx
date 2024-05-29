import { View, Text } from 'react-native'
import React from 'react'
import TextComponent from './TextComponent'



interface Props {
    title:string , 
    size ?:number , 
    color?:string , 
    font?:string
}
const TitleComponent = (props:Props) => {
    const {title , size , color , font} = props
  return (
        <TextComponent text={title} size={size??24} font={font} color={color}/>
  )
}

export default TitleComponent