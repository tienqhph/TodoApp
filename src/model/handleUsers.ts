///taọ nhiều phương thức với user

import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export class HandleUser {
  static SaveUserToDatabase = async (user: FirebaseAuthTypes.User) => {
    const data = {
      email: user.email,
      displayName: user.displayName
        ? user.displayName
        : user.email
        ? user.email?.split('@')[0]
        : '',
    };
    try {
      //sử dụng .set để không tự sinh ra id
      await firestore()
        .doc(`users/${user.uid}`)
        .set(data)
        .then(() => console.log('add sucssesfully'));
    } catch (error) {
      console.log(error);
    }
  };
}
