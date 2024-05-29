import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React, {ReactNode, useState} from 'react';
import SectionConponent from './SectionConponent';
import RowComponent from './RowComponent';
import CardComponent from './CardComponent';
import {colors} from '../constants/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import TextComponent from './TextComponent';
import { Eye, EyeSlash } from 'iconsax-react-native';

interface Props {
  placeHolder?: string;
  value: string;
  prefix?: ReactNode;
  affix?: ReactNode;
  title: string;
  alowClear?: boolean;
  multible?: boolean;
  numberofline?: number;
  isPassword?:Boolean; 
   isshowPass?:boolean
  onChange: (val: string) => void;
}
const InputComponent = (props: Props) => {
  const {
    placeHolder,
    value,
    prefix,
    affix,
    alowClear,
    title,
    multible,
    numberofline,
    onChange,
    isPassword, 


  } = props;
  const [showPass, setshowPass] = useState(false);
  return (

    
    <View>
        {title&& <TextComponent text={title}/>}
      <CardComponent
      bgColor={colors.gray}
      style={{borderRadius: 12, padding: 10}}>

      
      <RowComponent style = {{}}>
        {prefix && prefix}
        <View style={{flex: 1}}>
          <TextInput
            style={[{color: colors.white  , paddingHorizontal:prefix? 10:0} ]}
            placeholder={placeHolder ?? ''}
            value={value}
            multiline = {multible}
            numberOfLines={numberofline}
            placeholderTextColor={colors.white}
            onChangeText={(val: any) => onChange(val)}
            secureTextEntry = {isPassword&& !showPass}
            autoCapitalize='none'

          />
        </View>
        {affix && affix}

        {alowClear && value&& (
          <TouchableOpacity onPress={()=>onChange('')}>
            <AntDesign name="close" size={20} color={colors.white} />
          </TouchableOpacity>
        )}
     {isPassword && value&& (
          <TouchableOpacity onPress={()=>setshowPass(!showPass)}>
            {showPass?     <EyeSlash size={20} color={colors.white} />:<Eye  size={20} color={colors.white} />}
          </TouchableOpacity>
        )}
      
      </RowComponent>
    </CardComponent>
    </View>
  );
};

export default InputComponent;
