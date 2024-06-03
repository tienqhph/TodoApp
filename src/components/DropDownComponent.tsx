import {View, Text, Modal, TouchableOpacity, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import CardComponent from './CardComponent';
import {colors} from '../constants/colors';
import RowComponent from './RowComponent';
import TextComponent from './TextComponent';
import {
  ArrowDown2,
  CloseCircle,
  SearchNormal,
  TickCircle,
} from 'iconsax-react-native';
import ContainerComponent from './ContainerComponent';
import {SelectModal} from '../model/SelectModal';
import {FlatList} from 'react-native';
import SectionConponent from './SectionConponent';
import ButtonComponent from './ButtonComponent';
import InputComponent from './InputComponent';
import AntDesign from 'react-native-vector-icons/AntDesign';
interface Props {
  title: string;
  items: SelectModal[];
  selected?: string[];
  muntible?: boolean;
  onselected: (val: string[]) => void;
}
const DropDownComponent = (props: Props) => {
  const {title, selected, items, onselected, muntible} = props;

  const [isShowModal, setisShowModal] = useState(false);
  const [TextSearch, setTextSearch] = useState('');
  const [dataSearch, setdataSearch] = useState<SelectModal[]>([]);
  const [ListDataSelected, setListDataSelected] = useState<string[]>([]);

  useEffect(() => {
    selected && setListDataSelected(selected);
  }, [selected, isShowModal]);
  useEffect(() => {
    if (!TextSearch) {
      setdataSearch([]);
    } else {
      const data = items.filter(data =>
        data.label.toLowerCase().includes(TextSearch.toLowerCase()),
      );
      setdataSearch(data);
    }
  }, [TextSearch]);

  const handleChangePeople = (id: string) => {
    if (muntible) {
      const data = [...ListDataSelected];

      const index = data.findIndex(item => item === id);

      if (index !== -1) {
        data.splice(index, 1);
      } else {
        data.push(id);
      }

      setListDataSelected(data);
    } else {
      setListDataSelected([id]);
    }
  };
  const handleRemoveUserSelected = (index: number) => {
    if (selected) {
      selected.splice(index, 1);
      onselected(selected);
    }
  };

  const handleConfirm = () => {
    setisShowModal(false);
    onselected(ListDataSelected);
    setListDataSelected([]);
  };

  const renderDataUids = (id: string, index: number) => {
    const listitem = items.find(item => item.value === id);
    return (
      <RowComponent
        onPress={() => handleRemoveUserSelected(index)}
        key={index}
        borerRadius={12}
        style={{margin: 8, padding: 10, borderWidth: 1, borderColor: 'white'}}
        jutifilecontent="flex-start">
        <TextComponent text={listitem?.label} />
        <AntDesign name="close" size={20} color="white" />
      </RowComponent>
    );
  };
  return (
    <View>
      <TextComponent text={title} size={14} color="white" />
      <CardComponent
        bgColor={colors.gray}
        style={{borderRadius: 12, padding: 10}}>
        <RowComponent
          style={{paddingVertical: 12}}
          onPress={() => setisShowModal(true)}>
          {selected && selected.length > 0 ? (
            <RowComponent
              style={{flexWrap: 'wrap', borderRadius: 12, flex: 1}}
              jutifilecontent="flex-start">
              {selected.map((id, index) => renderDataUids(id, index))}
            </RowComponent>
          ) : (
            <TextComponent text="sdfasdsdas" style={{flex: 1}} />
          )}
          <ArrowDown2 size={20} color="white" />
        </RowComponent>
      </CardComponent>

      <Modal
        visible={isShowModal}
        style={{flex: 1}}
        statusBarTranslucent
        animationType="slide"
        transparent>
        <View
          style={{
            flex: 1,
            backgroundColor: colors.bgcolor,
            paddingVertical: 50,
            paddingHorizontal: 20,
          }}>
          <FlatList
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
              <RowComponent style={{flex: 1}}>
                <View style={{flex: 1, paddingRight: 10}}>
                  <InputComponent
                    placeHolder="search"
                    onChange={val => setTextSearch(val)}
                    value={TextSearch}
                    title=""
                    alowClear
                    prefix={<SearchNormal size={20} color="white" />}
                  />
                </View>
                <ButtonComponent
                  title="cancle"
                  onPress={() => setisShowModal(false)}
                  color="coral"
                />
              </RowComponent>
            }
            data={TextSearch ? dataSearch : items}
            renderItem={({item}) => (
              <RowComponent
                jutifilecontent="flex-start"
                onPress={() => handleChangePeople(item.value)}>
                <TextComponent
                  text={item.label}
                  style={{flex: 1}}
                  color={
                    ListDataSelected.includes(item.value) ? 'coral' : 'white'
                  }
                />

                {ListDataSelected.includes(item.value) && (
                  <TickCircle size={20} color="coral" />
                )}
              </RowComponent>
            )}
          />
          <ButtonComponent
            title="Confirm"
            onPress={handleConfirm}
            bgColor={colors.button}
            style={{
              marginHorizontal: 10,
              paddingVertical: 12,
              borderRadius: 12,
            }}
          />
        </View>
      </Modal>
    </View>
  );
};

export default DropDownComponent;
