import {View, Text, Modal, Button, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import TextComponent from './TextComponent';
import RowComponent from './RowComponent';
import {colors} from '../constants/colors';
import {Arrow, ArrowDown2} from 'iconsax-react-native';
import CardComponent from './CardComponent';
import SpaceComponent from './SpaceComponent';
import DatePicker from 'react-native-date-picker';

interface Props {
  title?: string;
  selected?: Date;
  type: 'date' | 'time' | 'datetime';
  onselected: (val: Date) => void;
  pleaceHolder?: string;
}
const DateTimePickerComponent = (props: Props) => {
  const {title, pleaceHolder, selected, onselected, type} = props;

  const [isvisibedatetime, setisvisibedatetime] = useState(false);

  const [date, setdate] = useState(selected??new Date());
  return (
    <View>
      {title && <TextComponent text={title} />}
      <CardComponent
        bgColor={colors.gray}
        style={{borderRadius: 12, padding: 10}}>
        <RowComponent onPress={() => setisvisibedatetime(true)}>
          <TextComponent
            style={{flex: 1}}
            text={
              selected
                ? type=='time'?`${selected.getHours()}:${selected.getMinutes()}`: `${selected.getDate() } / ${selected.getMonth()+1} / ${selected.getFullYear()}`
                : pleaceHolder
                ? pleaceHolder
                : ''
            }
            color={selected ? colors.white : '#676767'}
          />
          <ArrowDown2 size={20} color={colors.white} />
        </RowComponent>
      </CardComponent>

      <Modal visible={isvisibedatetime} transparent animationType="slide">
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.6)',
          }}>
          <View
            style={{
              margin: 20,
              borderRadius: 20,
              padding: 20,
              alignItems: 'center',
              justifyContent: 'center',
              width: '80%',
              backgroundColor: colors.white,
            }}>
            <DatePicker
              mode={type?type:'datetime'}
              date={selected ?? new Date()}
              onDateChange={val => setdate(val)}
              locale='vi'
            />

            <TouchableOpacity onPress={() =>{
                onselected(date)
                setisvisibedatetime(false)}}>
              <Text>Confirm</Text>
            </TouchableOpacity>

            <SpaceComponent height={20} />
            <TouchableOpacity onPress={() => setisvisibedatetime(false)}>
              <Text>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DateTimePickerComponent;
