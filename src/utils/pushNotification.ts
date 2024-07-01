import messaging from '@react-native-firebase/messaging';

import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
const user = auth().currentUser;
export class PushNotification {
  static checkPermission = async () => {
    const authStatus = await messaging().requestPermission();

    if (
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL
    ) {
      this.getFxmTocken();
    }
  };
  static getFxmTocken = async () => {
    // const fcmtocken = await messaging().getToken()
    const fcmtoken = await AsyncStorage.getItem('fcmtocken');
    if (!fcmtoken) {
      const tocken = await messaging().getToken();
      if (tocken) {
        await AsyncStorage.setItem('fcmtocken', tocken);
        this.updateToken(tocken);
      }
    }
  };

  static updateToken = async (token: string) => {
    await firestore()
      .doc(`users/${user?.uid}`)
      .get()
      .then(snap => {
        const data: any = snap.data();

        if (!data.tokens || data.tokens.includes(token)) {
          firestore()
            .doc(`users/${user?.uid}`)
            .update({
              tokens: firestore.FieldValue.arrayUnion(token),
            });
        }
      });
  };

  static handlePushNotification = async ({
    title,
    body,
    memberId,
  }: {
    title: string;
    body: string;
    memberId: string;
  }) => {
    try {
      const member: any = (
        await firestore().doc(`users/${memberId}`).get()
      ).data();

      console.log(member.tokens[0]);

      if (member && member.tokens) {
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Host', 'fcm.googleapis.com');
        myHeaders.append(
          'Authorization',
          'Bearer ya29.a0AXooCgt2_H8RsXzNRprYm6spPVljm-4R9EsjQeGzovL2_XmMP4kgOdHIkM-8TGnhtxFMmKr6nxESvkuDq28RQ5NLdcRZWkr23TFCxiItG9fT9Gypq9RRsbF3u1_HGlGpm31Y1QulOQB_8dF258_tMZKcJSTSJwOYuvNdaCgYKAVQSARASFQHGX2MiXYFbUIAxsMJmdId-OijbIw0171',
        );

        const raw = JSON.stringify({
          message: {
            token:
              `${member.tokens[0]}`,
            notification: {
              body: body,
              title: title,
           
            },
          },
        });

        const requestOptions:any = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow',
        };

        fetch(
          'https://fcm.googleapis.com/v1/projects/todolistapp-41621/messages:send',
          requestOptions,
        )
          .then(response => response.text())
          .then(result => console.log(result))
          .catch(error => console.error(error));
          
      }
    } catch (error) {}
  };
}
