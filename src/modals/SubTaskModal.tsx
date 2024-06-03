import {
  View,
  Text,
  StyleProp,
  ViewStyle,
  Modal,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ButtonComponent from '../components/ButtonComponent';
import RowComponent from '../components/RowComponent';
import InputComponent from '../components/InputComponent';
import {colors} from '../constants/colors';
import SpaceComponent from '../components/SpaceComponent';

import firestore from '@react-native-firebase/firestore';
import {SubTaskModel} from '../model/TaskModel';

interface Props {
  title?: string;
  visible: boolean;
  dataSlected?: string[];

  onclose: () => void;
  styles?: StyleProp<ViewStyle>;
  taskid: string;
}

const initialValue: SubTaskModel = {
  title: '',
  description: '',
  taskId: '',
  isCompleted: false,
  createdAt: 0,
  updatedAt: 0,
};
const SubTaskModal = (props: Props) => {
  const {visible, onclose, styles, dataSlected, title, taskid} = props;
  const [dataSubTask, setdataSubTask] = useState(initialValue);

  const hanldeChangeValue = (key: string, val: string) => {
    const data: any = {
      ...dataSubTask,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      taskId: taskid,
    };

    data[`${key}`] = val;

    setdataSubTask(data);
  };

  const onSave = async () => {
    try {
      await firestore()
        .collection('subtasks')
        .add(dataSubTask)
        .then(() => console.log('add sucssesful'))
        .catch(error => console.log(error.message));
    } catch (error) {
      console.log(error);
    }
    setdataSubTask(initialValue);
    onclose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      statusBarTranslucent
      animationType="slide">
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.6)',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            padding: 20,
            borderRadius: 12,
            backgroundColor: colors.bgcolor,
            width: Dimensions.get('window').width * 0.8,
            height: 'auto',
          }}>
          <InputComponent
            onChange={val => hanldeChangeValue('title', val)}
            title="Title"
            alowClear
            value={dataSubTask.title}
          />

          <SpaceComponent height={20} />
          <InputComponent
            onChange={val => hanldeChangeValue('description', val)}
            title="Description"
            alowClear
            placeHolder=""
            value={dataSubTask.description}
          />
          <RowComponent>
            <TouchableOpacity
              onPress={() => onclose()}
              style={{
                alignItems: 'center',
                flex: 1,
                marginVertical: 20,
                padding: 18,

                borderRadius: 14,
              }}>
              <Text style={{color: colors.white}}>Close</Text>
            </TouchableOpacity>
            <ButtonComponent
              onPress={() => onSave()}
              title="Save"
              style={{
                backgroundColor: '#3168e0',

                flex: 1,
                padding: 18,

                borderRadius: 14,
              }}
            />
          </RowComponent>
        </View>
      </View>
    </Modal>
  );
};

export default SubTaskModal;
