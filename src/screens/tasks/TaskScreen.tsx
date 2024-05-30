import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import ContainerComponent from '../../components/ContainerComponent';
import SectionConponent from '../../components/SectionConponent';
import HeaderAppComponent from '../../components/HeaderAppComponent';
import {Back, Clock, PenAdd} from 'iconsax-react-native';
import {colors} from '../../constants/colors';
import {useNavigation} from '@react-navigation/native';
import {RootStack} from '../../navigations/TypeChecking';
import TextComponent from '../../components/TextComponent';
import InputComponent from '../../components/InputComponent';
import {AttachmentModel, taskModel} from '../../model/TaskModel';
import DateTimePickerComponent from '../../components/DateTimePickerComponent';
import RowComponent from '../../components/RowComponent';
import SpaceComponent from '../../components/SpaceComponent';
import DropDownComponent from '../../components/DropDownComponent';
import {SelectModal} from '../../model/SelectModal';
import firestore, {and} from '@react-native-firebase/firestore';
import ButtonComponent from '../../components/ButtonComponent';
import storage from '@react-native-firebase/storage';
import {
  DocumentPickerResponse,
  pick,
  types,
} from 'react-native-document-picker';
import UploadFileFromStorageCompopnent from '../../components/UploadFileFromStorageCompopnent';

const initialVal: taskModel = {
  title: '',
  description: '',
  dueDate: new Date(),
  start: new Date(),
  end: new Date(),
  uids: [],
  attachment: [],
  id: '',
  progress: 0,
};
const TaskScreen = () => {
  const [addtask, setaddtask] = useState<taskModel>(initialVal);

  const [dataUserModal, setdataUserModal] = useState<SelectModal[]>([]);

  const [dataAttachment, setDataAttechment] = useState<AttachmentModel[]>([]);

  const onGetdataUserFromFirebase = async () => {
    await firestore()
      .collection('users')
      .get()
      .then(datauser => {
        if (datauser.empty) {
          console.log('data user not found');
        } else {
          const itemuser: SelectModal[] = [];
          datauser.forEach(item => {
            itemuser.push({
              label: item.data().name,
              value: item.id,
            });
          });
          setdataUserModal(itemuser);
        }
      })
      .catch((error: any) => {
        console.log(`error ${error.message}`);
      });
  };

  useEffect(() => {
    onGetdataUserFromFirebase();
    console.log('leeeee', dataUserModal.length);
  }, []);

  const handleChangeValue = (key: string, value: string | string[] | Date) => {
    const newdata: any = {...addtask};
    newdata[`${key}`] = value;

    setaddtask(newdata);
  };

  const handleAddtask = async () => {
    const data = {...addtask, attachment: [...dataAttachment]};

    await firestore()
      .collection('tasks')
      .add(data)
      .then(() => navigation.goBack())
      .catch(error => console.log(error.messgae));
  };

  const hanldeChangeFile = (data: AttachmentModel) => {
    setDataAttechment([...dataAttachment, data]);
  };

  const navigation = useNavigation<RootStack>();
  return (
    <View style={{flex: 1, backgroundColor: colors.bgcolor}}>
      <ContainerComponent>
        <SectionConponent>
          <View>
            <HeaderAppComponent
              fldicoration="row"
              title="Add new task"
              icon={
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Back size={20} color={colors.white} />
                </TouchableOpacity>
              }
            />
          </View>
        </SectionConponent>

        <View>
          <InputComponent
            value={addtask.title ?? ''}
            onChange={val => handleChangeValue('title', val)}
            placeHolder="hello"
            alowClear
            title="Title"
          />
          <InputComponent
            value={addtask.description ?? ''}
            onChange={val => handleChangeValue('description', val)}
            placeHolder="description"
            alowClear
            multible
            numberofline={3}
            title="Description"
          />
        </View>

        <DateTimePickerComponent
          title="Due Date"
          type="date"
          selected={addtask.dueDate}
          pleaceHolder="chose"
          onselected={val => handleChangeValue('dueDate', val)}
        />

        <RowComponent>
          <View style={{flex: 1}}>
            <DateTimePickerComponent
              title="Start "
              type="time"
              selected={addtask.start}
              pleaceHolder="chose"
              onselected={val => handleChangeValue('start', val)}
            />
          </View>
          <SpaceComponent width={12} />
          <View style={{flex: 1}}>
            <DateTimePickerComponent
              title="End "
              type="time"
              selected={addtask.end}
              pleaceHolder="chose"
              onselected={val => handleChangeValue('end', val)}
            />
          </View>
        </RowComponent>

        <DropDownComponent
          selected={addtask.uids}
          onselected={val => handleChangeValue('uids', val)}
          muntible
          title="Members"
          items={dataUserModal && dataUserModal}
        />

        <RowComponent jutifilecontent="flex-start">
          <TextComponent text="Attachments" style={{}} />
          <UploadFileFromStorageCompopnent
            onchangeFile={val => hanldeChangeFile(val)}
          />
        </RowComponent>
        {dataAttachment.map((data, index) => (
          <TextComponent key={index} text={data.name ?? ''} />
        ))}
      </ContainerComponent>

      <ButtonComponent
        title="Save"
        onPress={() => handleAddtask()}
        style={{
          flex: 0,
          marginTop: 20,
          padding: 12,
          borderRadius: 12,
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 10,
        }}
        bgColor={colors.button}
      />
    </View>
  );
};

export default TaskScreen;
