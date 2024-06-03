import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import ContainerComponent from '../../components/ContainerComponent';
import SectionConponent from '../../components/SectionConponent';
import HeaderAppComponent from '../../components/HeaderAppComponent';
import {useNavigation, useRoute} from '@react-navigation/native';
import {RootStack, RouterPropAllTask} from '../../navigations/TypeChecking';
import {colors} from '../../constants/colors';
import {Back, SearchFavorite, SearchNormal} from 'iconsax-react-native';
import InputComponent from '../../components/InputComponent';
import CardComponent from '../../components/CardComponent';
import RowComponent from '../../components/RowComponent';
import CircularProgressComponent from '../../components/CircularProgressComponent';
import TextComponent from '../../components/TextComponent';
import {fonts} from '../../constants/fontFamily';
import {taskModel} from '../../model/TaskModel';

const AllTaskScreen = () => {
  const [searchKey, setsearchKey] = useState('');
  const navigation = useNavigation<RootStack>();
  const [dataSearch, setdataSearch] = useState<taskModel[]>([]);

  const {params} = useRoute<RouterPropAllTask>();

  useEffect(() => {
    if (searchKey.length>0 , params?.data) {

      const dataarray:any = []
      params.data.map((data, index) => {
          if(   data.title&& data.title.toLowerCase().includes(searchKey.toLowerCase())){
              dataarray.push(data)
          }
      });

   setdataSearch(dataarray)
    } else {
      setdataSearch([]);
    }
  }, [searchKey]);

  const RenderDisplayTask = (data: any, index: number) => (
    <CardComponent
      key={index}
      bgColor={colors.gray}
      
      style={{borderRadius: 12, marginVertical: 10 ,justifyContent:'center'}}>
      <RowComponent
        jutifilecontent="space-between"
        style={{alignItems: 'flex-start'}}>
        <CircularProgressComponent
          value={(data.progress ?? 0) * 100}
          valueSuffix="%"
          radius={30}
        />

        <View style={{flex: 1, paddingHorizontal: 10}}>
          <TextComponent text={'Tilte: ' + data.title} />
          <TextComponent
            text={'Description: ' + data.description}
            numberonline={3}
          />
        </View>
      </RowComponent>
    </CardComponent>
  );
  return (
    <ContainerComponent>
      <SectionConponent>
        <View>
          <HeaderAppComponent
            fldicoration="row"
            title="All task"
            icon={
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Back size={20} color={colors.white} />
              </TouchableOpacity>
            }
          />
        </View>
      </SectionConponent>

      <SectionConponent>
        <InputComponent
          prefix={<SearchNormal size={20} color="white" />}
          alowClear
          title=""
          placeHolder="Search keys"
          onChange={val => setsearchKey(val)}
          value={searchKey}
        />
      </SectionConponent>

      <SectionConponent>
        {searchKey ? (
          dataSearch.map((data, index) => RenderDisplayTask(data, index))
        ) : params?.data ? (
          params.data.map((data, index) => RenderDisplayTask(data, index))
        ) : (
          <></>
        )}
      </SectionConponent>
    </ContainerComponent>
  );
};

export default AllTaskScreen;
