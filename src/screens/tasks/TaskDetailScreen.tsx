import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TouchableHighlight,
  TouchableHighlightBase,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {RootStack, RouterProp} from '../../navigations/TypeChecking';
import firestore from '@react-native-firebase/firestore';
import {taskModel} from '../../model/TaskModel';
import ContainerComponent from '../../components/ContainerComponent';
import {styles} from '../../styles/globalStyle';
import SectionConponent from '../../components/SectionConponent';
import CardComponent from '../../components/CardComponent';
import {colors} from '../../constants/colors';
import {
  AddSquare,
  Back,
  Calendar,
  Clock,
  TickCircle,
  TickSquare,
} from 'iconsax-react-native';
import RowComponent from '../../components/RowComponent';
import TextComponent from '../../components/TextComponent';
import AvatarComponent from '../../components/AvatarComponent';
import {fonts} from '../../constants/fontFamily';
import {image, namedate} from '../../constants/const';
import {Slider} from '@miblanchard/react-native-slider';
import SpaceComponent from '../../components/SpaceComponent';
import ButtonComponent from '../../components/ButtonComponent';
const TaskDetailScreen = () => {
  const [dataByid, setdataByid] = useState<taskModel>();
  const {params} = useRoute<RouterProp>();
  const [radiobuton, setradiobuton] = useState(false);
  const data: any = params.data;
  const [valueProgress, setvalueProgress] = useState(0);

  console.log("data params" , data)
  const getdataByid = () => {
    firestore()
      .collection(`tasks`)
      .doc(`${data.taskid}`)
      .onSnapshot((snap: any) => {
        setdataByid({taskid: snap.id, ...snap.data()});
      });
  };
  useEffect(() => {
    getdataByid();
  }, [1]);

  const navigation = useNavigation<RootStack>();
  const convertTimestampToDate = (data: any) => {
    if (data) {
      const ts = (data.seconds + data.nanoseconds / 1000000000) * 1000;

      const date = new Date(ts);
      return `${date.getDate()}-${namedate[date.getMonth()]}`;
    } else {
      console.log('data not found');
    }
  };
  const convertTimestampToTime = (data: any) => {
    if (data) {
      const ts = (data.seconds + data.nanoseconds / 1000000000) * 1000;

      const date = new Date(ts);
      return `${
        date.getHours() > 12
          ? date.getHours() - 12 + ' pm'
          : date.getHours() + ' am'
      }`;
    } else {
      console.log('data not found');
    }
  };


  const handleUpdate  = ()=>{
    firestore()
    .collection('tasks')
    .doc(data.taskid)
    .update({
      title:'titleádsa2'
    })
    .then(() => {
      console.log('User updated!');
    });
  }
  return (
<>
<ScrollView style={{backgroundColor: colors.bgcolor, flex: 1}}>
      <View
        style={[
          {
            backgroundColor: params.color ?? params.color,
            paddingLeft: 20,
            paddingHorizontal: 20,
            borderBottomRightRadius: 20,
            borderBottomLeftRadius: 20,
          },
        ]}>
        <SectionConponent style={{paddingTop: 40}}>
          <RowComponent jutifilecontent="space-between">
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Back size={20} color="white" />
            </TouchableOpacity>
            <TextComponent
              text={dataByid?.title}
              flex={1}
              textalight="center"
            />
          </RowComponent>

          <TextComponent text="Due  date" style={{paddingTop: 20}} />
          <RowComponent jutifilecontent="space-between" style={{}}>
            <RowComponent>
              <Clock size={20} color="white" />
              <TextComponent
                text={
                  convertTimestampToTime(dataByid?.start) +
                  ' - ' +
                  convertTimestampToTime(dataByid?.end)
                }
                style={{paddingHorizontal: 10}}
              />
            </RowComponent>
            <RowComponent>
              <Calendar size={20} color="white" />
              <TextComponent
                text={convertTimestampToDate(dataByid?.dueDate) + ''}
                style={{paddingHorizontal: 10}}
              />
            </RowComponent>

            <AvatarComponent idtask={dataByid?.taskid ?? ''} uids={data.uids} />
          </RowComponent>
        </SectionConponent>
      </View>
      <View style={{padding: 20}}>
        <TextComponent text="Descriptions" font={fonts.regular} size={24} />

        <View
          style={{
            width: '100%',
            borderWidth: 1,
            borderColor: colors.gray,
            padding: 20,
            borderRadius: 20,
          }}>
          <TextComponent text={dataByid?.description} />
        </View>
        <CardComponent
          bgColor={colors.gray}
          style={{marginTop: 20, borderRadius: 20}}>
          <RowComponent>
            <TextComponent text="File & Links:" />

            <TouchableOpacity>
              <Image source={image.imgdoc} style={{width: 50, height: 50}} />
            </TouchableOpacity>

            <TouchableOpacity>
              <Image source={image.imgpdf} style={{width: 50, height: 50}} />
            </TouchableOpacity>

            <TouchableOpacity>
              <Image source={image.imgxls} style={{width: 50, height: 50}} />
            </TouchableOpacity>

            <TouchableOpacity>
              <Image
                source={image.imgaddfile}
                style={{width: 50, height: 50}}
              />
            </TouchableOpacity>
          </RowComponent>
        </CardComponent>
      </View>

      <RowComponent
        style={{alignItems: 'center', justifyContent: 'center', padding: 20}}>
        <TouchableOpacity
          onPress={() => setradiobuton(!radiobuton)}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingRight: 10,
          }}>
          <View
            style={{
              width: 20,
              height: 20,
              borderWidth: 2,
              borderColor: colors.green,
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {radiobuton && (
              <View
                style={{
                  backgroundColor: colors.green,
                  borderRadius: 6,
                  width: 12,
                  height: 12,
                }}
              />
            )}
          </View>
        </TouchableOpacity>
        <TextComponent
          text="In Progess"
          font={fonts.regular}
          size={20}
          flex={1}
        />
      </RowComponent>

      <RowComponent style={{paddingHorizontal: 20}}>
        <Slider
        value={data.progress[0]}

        onValueChange={(val:any )=> setvalueProgress(val)}
          containerStyle={{flex: 1}}
          minimumTrackTintColor={colors.green}
          minimumTrackStyle={{padding: 5, borderRadius: 100}}
          maximumTrackStyle={{padding: 5, borderRadius: 100}}
          maximumTrackTintColor={colors.gray}
          thumbTintColor={colors.green}
          thumbStyle={{borderColor: colors.white, borderWidth: 2}}
        />
      <SpaceComponent width={10}/>
        <TextComponent text={Math.floor(valueProgress*100)+'%'} font={fonts.bold} />
      </RowComponent>

      <RowComponent style={{paddingHorizontal: 20}}>
        <TextComponent
          text="Subtask"
          style={{flex: 1}}
          font={fonts.regular}
          size={24}
        />
        <TouchableOpacity>
          <AddSquare size={24} color={colors.green} variant="Bold" />
        </TouchableOpacity>
      </RowComponent>

      {Array.from({length: 4}).map((data, index) => (
        <CardComponent
          key={index}
          bgColor={colors.gray}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: 10,
            marginHorizontal: 20,
            borderRadius: 12,
          }}>
          <RowComponent style={{alignItems: 'center', flex: 1}}>
            <TickCircle
              size={20}
              color={colors.green}
              variant="Bold"
              style={{marginRight: 10}}
            />
            <TextComponent text="Task" flex={1} />
          </RowComponent>
        </CardComponent>
      ))}
    </ScrollView>

  
      <ButtonComponent title='Update' onPress={()=>handleUpdate()}  style = {{ width:'90%' ,  borderRadius:12, padding:20, marginHorizontal:20,  bottom:10 , position:'absolute' }} bgColor={colors.button}/>

</>
  );
};

export default TaskDetailScreen;
