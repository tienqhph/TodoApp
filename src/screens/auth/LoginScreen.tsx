import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import ContainerComponent from '../../components/ContainerComponent';
import SectionConponent from '../../components/SectionConponent';
import TextComponent from '../../components/TextComponent';
import {fonts} from '../../constants/fontFamily';
import InputComponent from '../../components/InputComponent';
import ButtonComponent from '../../components/ButtonComponent';
import {colors} from '../../constants/colors';
import {Eye, Lock, Sms} from 'iconsax-react-native';
import SpaceComponent from '../../components/SpaceComponent';
import RowComponent from '../../components/RowComponent';
import {useNavigation} from '@react-navigation/native';
import {RootStack, RootStackParamList} from '../../navigations/TypeChecking';
import auth from '@react-native-firebase/auth';
const LoginScreen = () => {
  const [Email, setEmail] = useState('');

  const [showIndicator, setshowIndicator] = useState(false);
  const [Password, setPassword] = useState('');
  const [textError, settextError] = useState('');
  useEffect(() => {
    if (Email || Password) {
      settextError('');
    }
  }, [Email, Password]);
  const handleLogin = async () => {
    if (!Email || !Password) {
      settextError('Please enter your emal and password');
    } else {
      settextError('');
      setshowIndicator(true);
      await auth()
        .signInWithEmailAndPassword(Email, Password)
        .then(usercredential => {
          console.log('User account created & signed in!');
          setshowIndicator(false);
        })
        .catch((error: any) => {
          setshowIndicator(false), settextError(error.message);
        });
    }
  };

  const navigation = useNavigation<RootStack>();
  return (
    <ContainerComponent style={{justifyContent: 'center'}}>
      <SectionConponent style={{}}>
        <TextComponent text="Login" font={fonts.bold} size={24} />

        <View>
          <InputComponent
            prefix={<Sms size={20} color="white" />}
            title="Email"
            alowClear
            placeHolder="Email"
            onChange={val => setEmail(val)}
            value={Email}
          />
          <InputComponent
            prefix={<Lock size={20} color="white" />}
            isPassword
            title="PassWord"
            placeHolder="Pass"
            onChange={val => setPassword(val)}
            value={Password}
          />
        </View>
        <SpaceComponent height={20} />
        <TextComponent text={textError} color="red" />
        <View style={{marginVertical: 20}}>
          <ButtonComponent
            showIdicator={showIndicator}
            onPress={() => handleLogin()}
            title="Login"
            bgColor={colors.lightblue}
            font={fonts.bold}
            style={{padding: 20, borderRadius: 12}}
          />
        </View>
        <SpaceComponent height={20} />

        <RowComponent>
          <TextComponent text={`you don't have a account?`} />

          <ButtonComponent
            title="Create one"
            onPress={() => navigation.push('SignUp')}
            color={'coral'}
            style={{paddingHorizontal: 12}}
          />
        </RowComponent>
      </SectionConponent>
    </ContainerComponent>
  );
};

export default LoginScreen;
