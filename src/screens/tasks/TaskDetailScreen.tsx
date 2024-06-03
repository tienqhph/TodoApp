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
import {StackActions, useNavigation, useRoute} from '@react-navigation/native';
import {RootStack, RouterProp} from '../../navigations/TypeChecking';
import firestore from '@react-native-firebase/firestore';
import {AttachmentModel, SubTaskModel, taskModel} from '../../model/TaskModel';
import ContainerComponent from '../../components/ContainerComponent';
import {styles} from '../../styles/globalStyle';
import SectionConponent from '../../components/SectionConponent';
import CardComponent from '../../components/CardComponent';
import {colors} from '../../constants/colors';
import {
  AddSquare,
  Back,
  Calendar,
  Check,
  Clock,
  ProfileDelete,
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
import InputComponent from '../../components/InputComponent';
import UploadFileFromStorageCompopnent from '../../components/UploadFileFromStorageCompopnent';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SubTaskModal from '../../modals/SubTaskModal';
const TaskDetailScreen = () => {
  const [dataByid, setdataByid] = useState<taskModel>();
  const {params} = useRoute<RouterProp>();
  const [radiobuton, setradiobuton] = useState(false);
  const data: any = params.data;
  const [valueProgress, setvalueProgress] = useState(data.progress);
  const [showClaueProgress, setshowClaueProgress] = useState(0);
  const [showButtonUpdate, setshowButtonUpdate] = useState(false);

  const [UrgenTask, setUrgenTask] = useState(data.isUrgen);
  const [showModalSubTask, setshowModalSubTask] = useState(false);
  const [dataAttachment, setdataAttachment] = useState<AttachmentModel[]>(
    data.attachment,
  );
  const [dataFilterChangeValue, setdataFilterChangeValue] = useState<
    SubTaskModel[]
  >([]);

  const [dataDescriptionUpdate, setdataDescriptionUpdate] = useState(
    data.description,
  );
  console.log('data params', data.progress);
  const getdataByid = () => {
    firestore()
      .collection(`tasks`)
      .doc(`${data.taskid}`)
      .onSnapshot((snap: any) => {
        setdataByid({taskid: snap.id, ...snap.data()});
      });
  };

  useEffect(() => {
    if (
      valueProgress === data.progress &&
      dataDescriptionUpdate.match(data.description) &&
      data.attachment.length === dataAttachment.length&&  data.isUrgen ===UrgenTask
    ) {
      setshowButtonUpdate(false);
    } else {
      setshowButtonUpdate(true);
    }
  }, [valueProgress, dataDescriptionUpdate, dataAttachment , UrgenTask]);
  useEffect(() => {
    getdataByid();
  }, []);
  useEffect(() => {
    getDateFromFireStore();
  }, []);


  useEffect(()=>{
      if(dataFilterChangeValue.length>0){
        const completedPercent = dataFilterChangeValue.filter(data =>data.isCompleted).length/dataFilterChangeValue.length
        setvalueProgress(completedPercent)

   
      }else{
        setvalueProgress(0)
      }
  },[dataFilterChangeValue])
  const getDateFromFireStore = () => {
    try {
      firestore()
        .collection('subtasks')
        .onSnapshot(snap => {
          const dataArray: any = [];
          if (snap.empty) {
            console.log('data not found');
          } else {
            snap.forEach((datasnap, index) => {
              if (datasnap.data().taskId == data.taskid) {
                dataArray.push({...datasnap.data() , idSubtask:datasnap.id});
              }
          
              const datacopy = [...dataArray];
              setdataFilterChangeValue(datacopy);
              
        
            });
          }
        });
    } catch (error: any) {
      console.log(error.message);
    }
  };

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

  const handleUpdate = () => {
    firestore()
      .collection('tasks')
      .doc(data.taskid)
      .update({
        attachment: [...dataAttachment],
        isUrgen :UrgenTask,
        description: dataDescriptionUpdate,
        progress: valueProgress,
    
      })
      .then(() => {
        console.log('User updated!');
        setshowButtonUpdate(false);
      });
  };


  const handleUpdateSubTask = async(idsubtask:string , iscompleted:boolean)=>{


  await firestore().doc(`subtasks/${idsubtask}`).update({
    isCompleted : !iscompleted,

  }).then(()=>console.log("update sussesfuly")).catch(error=>console.log(error.message))

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
              <TouchableOpacity
                onPress={() => navigation.dispatch(StackActions.pop(1))}>
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

              {dataByid && (
                <AvatarComponent
                  idtask={dataByid?.taskid ?? ''}
                  uids={dataByid?.uids ?? []}
                />
              )}
            </RowComponent>
          </SectionConponent>
        </View>
        <View style={{padding: 20}}>
          <TextComponent text="Descriptions" font={fonts.regular} size={24} />

          <InputComponent
            value={dataDescriptionUpdate}
            onChange={val => setdataDescriptionUpdate(val)}
            title=""
          />
                   <RowComponent  jutifilecontent='flex-start'style={{alignItems: 'center', justifyContent:'flex-start' , marginVertical: 10 , }}>
                  <TouchableOpacity onPress={()=>setUrgenTask(!UrgenTask)}>
                    <Check size={20} color='white' variant={UrgenTask?"Bold":'Outline'} />
                  </TouchableOpacity>
                      <TextComponent text="Urrgen:" />
          </RowComponent>
          <RowComponent style={{alignItems: 'center', marginVertical: 10}}>
            <TextComponent text="File & Links:" flex={1} />
            <UploadFileFromStorageCompopnent
              onchangeFile={val => setdataAttachment([...dataAttachment, val])}
            />
          </RowComponent>
          <CardComponent
            bgColor={colors.gray}
            style={{
              justifyContent: 'center',
              marginVertical: 10,
              borderRadius: 12,
            }}>
            {dataAttachment?.map((data, index) => (
              <RowComponent style={{alignItems: 'center', flex: 1}} key={index}>
                <View style={{flex: 1}}>
                  <TextComponent text={data.name} />
                  <TextComponent
                    text={data.size + ''}
                    style={{alignItems: 'flex-start'}}
                  />
                </View>
                <TouchableOpacity>
                  <MaterialCommunityIcons name="delete" size={20} color="red" />
                </TouchableOpacity>
              </RowComponent>
            ))}
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
            disabled
            value={valueProgress}
          onValueChange={(val)=>setvalueProgress(val)}
            containerStyle={{flex: 1}}

            minimumTrackTintColor={colors.green}
            minimumTrackStyle={{padding: 5, borderRadius: 100}}
            maximumTrackStyle={{padding: 5, borderRadius: 100}}
            maximumTrackTintColor={colors.gray}
            thumbTintColor={colors.green}
            thumbStyle={{borderColor: colors.white, borderWidth: 2}}
          />
          <SpaceComponent width={10} />
          <TextComponent
            text={Math.floor(valueProgress * 100) + '%'}
            font={fonts.bold}
          />
        </RowComponent>

        <RowComponent style={{paddingHorizontal: 20}}>
          <TextComponent
            text="Subtask"
            style={{flex: 1}}
            font={fonts.regular}
            size={24}
          />
          <TouchableOpacity onPress={() => setshowModalSubTask(true)}>
            <AddSquare size={24} color={colors.green} variant="Bold" />
          </TouchableOpacity>
        </RowComponent>
        {dataFilterChangeValue &&
          dataFilterChangeValue.map((data, index) => (
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
              <RowComponent style={{alignItems: 'center', flex: 1}}  onPress={()=>handleUpdateSubTask(data.idSubtask??'' , data.isCompleted)} >
                <TickCircle
                  size={20}
                  color={colors.green}
                  variant={data.isCompleted ? 'Bold' : 'Outline'}
                  style={{marginRight: 10}}
                />
                <View style={{flex: 1}}>
                  <TextComponent text={data.title} flex={1} />
                  <TextComponent
                    text={
                      new Date(data.createdAt).getDate() +
                      '-' +
                      namedate[new Date(data.createdAt).getMonth()]  +
                      '-' +
                      new Date(data.createdAt).getFullYear()
                    }
                  />
                </View>
              </RowComponent>
            </CardComponent>
          ))}
      </ScrollView>
      <SubTaskModal
        visible={showModalSubTask}
        onclose={() => setshowModalSubTask(false)}
        taskid={data.taskid}
      />

      {showButtonUpdate ? (
        <ButtonComponent
          title="Update"
          onPress={() => handleUpdate()}
          style={{
            width: '90%',
            borderRadius: 12,
            padding: 20,
            marginHorizontal: 20,
            bottom: 10,
            position: 'absolute',
          }}
          bgColor={colors.button}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default TaskDetailScreen;
