import {View, Text, Image} from 'react-native';
import React, { useEffect, useState } from 'react';
import RowComponent from './RowComponent';
import TextComponent from './TextComponent';
import { colors } from '../constants/colors';
import { fonts } from '../constants/fontFamily';

import firestore from '@react-native-firebase/firestore'
import { SelectModal } from '../model/SelectModal';


interface Props  {
  uids:string[] , 
  idtask?:string
}






const AvatarComponent = (props :Props) => {
  
    const [dataUserSlected, setdataUserSlected] = useState<SelectModal[]>([]);
 
    const {uids} = props



  const getdataUserFromFirebase = ()=>{
    const newdata:any = []
       uids.map(item =>{  
        
        firestore().doc(`users/${item}`).onSnapshot((snap :any)=>{
          newdata.push({ 
            label:snap.data().name , 
            value:item
          })

          const data = [...newdata]
           setdataUserSlected(data)
        })
      } )
}

useEffect(() => {
  

  getdataUserFromFirebase()

    console.log('data' , dataUserSlected.length)

}, [uids]);
  return (
    <RowComponent jutifilecontent="flex-start">
      {dataUserSlected.map(
        (data, index) =>
          index < 3 && (
            <View key={index}
            
              style={[

                { alignItems:'center' , justifyContent:'center', width: 40, height: 40, borderRadius:20 , backgroundColor:'gray' , borderWidth:1 , borderColor:colors.white},
                index > 0 ? {marginLeft: -12} : {marginLeft: 0},
              ]}
            >
                <TextComponent text={data.label.charAt(0)} size={18} font={fonts.bold}/>
            </View>
          ),
      )}


      {dataUserSlected.length> 5 && (
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
            marginLeft:-20
          }}>
          <TextComponent text={`+${uids.length - 3 > 9 ? 9 : dataUserSlected.length - 3}`}  color='black' />
        </View>
      )}
    </RowComponent>
  );
};

export default AvatarComponent;
