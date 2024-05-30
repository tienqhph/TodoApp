import {
  Edit2,
  Element,
  Logout,
  Notification,
  SearchNormal1,
} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  PermissionsAndroid,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import ButtonComponent from '../../components/ButtonComponent';
import CardComponent from '../../components/CardComponent';
import ContainerComponent from '../../components/ContainerComponent';
import RowComponent from '../../components/RowComponent';
import SectionConponent from '../../components/SectionConponent';
import TextComponent from '../../components/TextComponent';
import TitleComponent from '../../components/TitleComponent';
import {colors} from '../../constants/colors';
import {fonts} from '../../constants/fontFamily';
import {styles} from '../../styles/globalStyle';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import AvatarComponent from '../../components/AvatarComponent';
import CircularProgressComponent from '../../components/CircularProgressComponent';
import ImageCardComponent from '../../components/ImageCardComponent';
import ProgressBarComponent from '../../components/ProgressBarComponent';
import SpaceComponent from '../../components/SpaceComponent';
import {taskModel} from '../../model/TaskModel';
import {RootStack} from '../../navigations/TypeChecking';

const requestReadPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        title: 'Storage Permission',
        message: 'This app needs access to your storage to read files.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can read from storage');
    } else {
      console.log('Read permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};

const requestWritePermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Storage Permission',
        message: 'This app needs access to your storage to write files.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can write to storage');
    } else {
      console.log('Write permission denied11111');
    }
  } catch (err) {
    console.warn(err);
  }
};

const GotoAddTask1 = async () => {
  console.log('vào đây');
  await requestReadPermission();
  await requestWritePermission();
};

const HomeScreen = () => {
  const user = auth().currentUser;
  const navigation = useNavigation<RootStack>();

  const [dataUser, setdataUser] = useState([]);

  const [loadingdata, setloadingdata] = useState(false);

  const [dataTasks, setdataTasks] = useState<taskModel[]>([]);

  const getDataFromJsonPleaceHolder = async () => {
    await axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then(dataget => {
        setdataUser(dataget.data);
      });
  };

  const HandleGetTasks = () => {
    setloadingdata(true);

    firestore()
      .collection('tasks')
      .orderBy('dueDate', 'asc')
      .limitToLast(3)
      .onSnapshot(snap => {
        if (snap.empty) {
          console.log('snap not found');
        } else {
          const items: taskModel[] = snap.docs.map(
            doc =>
              ({
                taskid: doc.id,
                ...doc.data(),
              } as taskModel),
          );
          setloadingdata(false);
          setdataTasks(items); // Cập nhật trạng thái với dữ liệu mới
          console.log('dataTasks', items); // Log the items instead of state here
        }
      });
  };
  useEffect(() => {
    HandleGetTasks();
  }, []);
  useEffect(() => {
    console.log('dataTasks updated:', dataTasks);
  }, [dataTasks]);

  const convertTimestampToDate = (data: any) => {
    const ts = (data.seconds + data.nanoseconds / 1000000000) * 1000;
    return new Date(ts);
  };
  const GotoAddTask = async () => {
    navigation.push('AddTask');
  };
  const handleGotoTaskDetail = (id: any, color: string) => {
    navigation.navigate('TaskDetail', {data: id, color: color});
  };
  const requestStoragePermission = async () => {
    try {
      const readGranted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message: 'This app needs access to your storage to read files.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      const writeGranted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message: 'This app needs access to your storage to write files.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      if (readGranted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can read from storage');
      } else {
        console.log('Read permission denied');
      }

      if (writeGranted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can write to storage');
      } else {
        console.log('Write permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  useEffect(() => {
    if (Platform.OS === 'android') {
      requestStoragePermission();
    }
  }, []);
  return (
    <View style={{backgroundColor: colors.bgcolor, flex: 1}}>
      <ScrollView>
        <ContainerComponent>
          <SectionConponent>
            <RowComponent jutifilecontent="space-between">
              <Element size="24" color="#ffffff" />
              <Notification size={24} color="#ffffff" />
            </RowComponent>
          </SectionConponent>
          <SectionConponent>
            <RowComponent jutifilecontent="space-between">
              <TitleComponent
                title={`Hi, ${user?.email}`}
                size={18}
                color={colors.title}
              />
              <TouchableOpacity onPress={async () => auth().signOut()}>
                <Logout size={20} color="white" />
              </TouchableOpacity>
            </RowComponent>
            <TextComponent
              text="Be productive today"
              size={20}
              font={fonts.semibold}
            />
          </SectionConponent>
          <SectionConponent>
            <RowComponent
              onPress={() => navigation.navigate('Search')}
              style={{backgroundColor: colors.gray}}
              borerRadius={12}>
              <TextComponent text="Search" flex={1} />
              <SearchNormal1 size={24} color="#ffffff" />
            </RowComponent>
          </SectionConponent>

          <SectionConponent>
            <CardComponent bgColor={colors.gray} style={{borderRadius: 12}}>
              <RowComponent jutifilecontent="space-between" borerRadius={12}>
                <View>
                  <TextComponent
                    text="Task Progress"
                    size={20}
                    font={fonts.semibold}
                  />
                  <TitleComponent
                    title="30/40  task done"
                    size={12}
                    color={colors.title}
                  />

                  <RowComponent jutifilecontent="flex-start">
                    <TouchableOpacity
                      style={[
                        {
                          backgroundColor: colors.lightblue,
                          alignItems: 'center',
                          justifyContent: 'center',

                          padding: 10,
                          borderRadius: 20,
                        },
                      ]}>
                      <TextComponent text="March 22" />
                    </TouchableOpacity>
                  </RowComponent>
                </View>
                <CircularProgressComponent value={80} valueSuffix="%" />
              </RowComponent>
            </CardComponent>
          </SectionConponent>

          {loadingdata ? (
            <ActivityIndicator size={20} />
          ) : dataTasks.length > 0 ? (
            <View>
              <SectionConponent>
                <RowComponent style={{alignItems: 'flex-start'}}>
                  {dataTasks[0] && (
                    <SectionConponent
                      onpress={() =>
                        handleGotoTaskDetail(
                          dataTasks[0],
                          'rgba(113,77,217,0.8)',
                        )
                      }
                      style={{
                        flex: 1,
                        backgroundColor: 'rgba(113,77,217,0.8)',
                        borderRadius: 12,
                      }}>
                      <ImageCardComponent>
                        <TouchableOpacity style={styles.viewIconedit}>
                          <Edit2 size={24} color="#ffffff" />
                        </TouchableOpacity>
                        <TextComponent
                          text={dataTasks[0].title}
                          size={20}
                          font={fonts.semibold}
                        />
                        <TextComponent
                          numberonline={4}
                          text={dataTasks[0].description}
                          size={12}
                        />

                        <View style={{marginTop: 60}}>
                          <AvatarComponent
                            idtask={dataTasks[0].taskid ?? ''}
                            uids={dataTasks[0].uids ?? []}
                          />

                          {dataTasks[0].progress && (
                            <ProgressBarComponent
                              percent={Math.floor(
                                (dataTasks[0].progress ?? 0) * 100,
                              )}
                              size={12}
                            />
                          )}
                        </View>

                        <TextComponent
                          text={
                            convertTimestampToDate(dataTasks[0].dueDate) + ''
                          }
                          color={colors.white}
                          size={12}
                        />
                      </ImageCardComponent>
                    </SectionConponent>
                  )}

                  <SpaceComponent width={12} />

                  <View style={{flex: 1}}>
                    {dataTasks[1] && (
                      <SectionConponent
                        onpress={() =>
                          handleGotoTaskDetail(
                            dataTasks[1],
                            'rgba(33,150,243,0.8)',
                          )
                        }>
                        <ImageCardComponent color="rgba(33,150,243,0.8)">
                          <TouchableOpacity style={styles.viewIconedit}>
                            <Edit2 size={24} color="#ffffff" />
                          </TouchableOpacity>
                          <TextComponent
                            text={dataTasks[1].title}
                            size={20}
                            font={fonts.semibold}
                          />

                          <AvatarComponent
                            idtask={dataTasks[1].taskid ?? ''}
                            uids={dataTasks[1].uids ?? []}
                          />

                          <ProgressBarComponent
                            percent={Math.floor(
                              (dataTasks[1].progress ?? 0) * 100,
                            )}
                            color="rgba(18,181,122,0.8)"
                            size={12}
                          />
                        </ImageCardComponent>
                      </SectionConponent>
                    )}

                    <SpaceComponent height={12} />
                    <View>
                      {dataTasks[2] && (
                        <SectionConponent
                          onpress={() =>
                            handleGotoTaskDetail(
                              dataTasks[2],
                              'rgba(18,181,122,0.8)',
                            )
                          }>
                          <ImageCardComponent color="rgba(18,181,122,0.8)">
                            <TouchableOpacity style={styles.viewIconedit}>
                              <Edit2 size={24} color="#ffffff" />
                            </TouchableOpacity>
                            <TextComponent
                              text={dataTasks[2].title}
                              size={20}
                              font={fonts.semibold}
                            />
                            <TextComponent
                              text={dataTasks[2].description}
                              size={12}
                              numberonline={3}
                            />
                          </ImageCardComponent>
                        </SectionConponent>
                      )}
                    </View>
                  </View>
                </RowComponent>
              </SectionConponent>

              <SectionConponent>
                <TextComponent
                  text="Urgent tasks"
                  size={24}
                  font={fonts.semibold}
                />

                <CardComponent bgColor={colors.gray} style={{borderRadius: 12}}>
                  <RowComponent
                    jutifilecontent="space-between"
                    style={{alignItems: 'flex-start'}}>
                    <CircularProgressComponent value={40} valueSuffix="%" />

                    <TextComponent text="Title" />
                  </RowComponent>
                </CardComponent>
              </SectionConponent>
            </View>
          ) : (
            <></>
          )}
        </ContainerComponent>
      </ScrollView>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ButtonComponent
          font={fonts.bold}
          onPress={() => GotoAddTask()}
          title="Add new Task   +"
          style={{
            position: 'absolute',
            backgroundColor: '#3168e0',
            bottom: 10,
            padding: 18,
            width: '80%',
            borderRadius: 14,
          }}
        />
      </View>
    </View>
  );
};

export default HomeScreen;
