import {
  Alert,
  BackHandler,
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import Button from '../../component/Button';
import {
  getRemoteConfigValue,
  refreshRemoteConfig,
} from '../../helper/remoteConfigHelper';
import messaging from '@react-native-firebase/messaging';
import analytics from '@react-native-firebase/analytics';
import remoteConfig from '@react-native-firebase/remote-config';
import auth from '@react-native-firebase/auth';
// import { pb } from '../../helper/pocketbase';
import notifee, {
  AndroidColor,
  AndroidImportance,
  AndroidStyle,
  EventType,
} from '@notifee/react-native';
import Sound from 'react-native-sound';

const HomeScreen = ({navigation, route}) => {
  let token = null;
  useEffect(() => {
    refreshRemoteConfig();
    remoteConfigSetting();
    checkToken();
    const onUnsubscribeNotificaitonListener = messaging().onMessage(
      remoteMessage => {
        if (remoteMessage) {
          console.log('string', JSON.stringify(remoteMessage));
          console.log('parse', dataNotif);
          const dataNotif = remoteMessage?.data ?? {};
          displayNotification(remoteMessage);
        }
      },
    );
    // messaging().setBackgroundMessageHandler(onMessageReceived);
    return () => {
      onUnsubscribeNotificaitonListener();
    };
  }, []);

  const remoteConfigSetting = async () => {
    await remoteConfig().setConfigSettings({
      isDeveloperModeEnabled: true,
      minimumFetchInterval: 0,
    });
  };

  const displayNotification = async data => {
    const dataAndroid = data?.notification?.android ?? {};
    const dataIOS = data?.data?.notification ?? {};
    const channelId = await notifee.createChannel({
      id: 'd2dpushnotif-channel3',
      name: 'd2dpushnotif-channe3',
      sound: 'hollow',
      importance: AndroidImportance.HIGH,
    });

    notifee.displayNotification({
      title: data?.notification?.title,
      body: data?.notification?.body,
      // subtitle: 'haloo semua',
      android: {
        channelId: channelId,
        smallIcon: 'ic_notification_3',
        largeIcon: dataAndroid?.imageUrl,
        tag: data?.sentTime.toString(),
        color: '#3242a8',
      },
    });
  };

  async function onDisplayNotification() {
    // Request permissions (required for iOS)
    if (Platform.OS === 'ios') {
      await notifee.requestPermission();
      await notifee.displayNotification({
        title: 'Notification Title',
        body: 'Custom sound',
        ios: {
          // attachments: [
          //   {
          //     url: require('./../../asset/op.jpg'),
          //     // thumbnailHidden: true,
          //   },
          // ],
          foregroundPresentationOptions: {
            badge: true,
            sound: true,
            banner: true,
            list: true,
          },
          sound: 'dkonsul.wav',
        },
      });
    }


    // Display a notification

    if (Platform.OS === 'android') {
      const channelId = await notifee.createChannel({
        id: 'd2dpushnotif-channel2',
        name: 'd2dpushnotif-channel2',
        sound: 'dkonsul',
        lights: true,
        lightColor: AndroidColor.RED,
        importance: AndroidImportance.HIGH,
      });
      await notifee.displayNotification({
        title: 'Notification Title',
        body: 'Main body content of the notification',
        android: {
          channelId: channelId,
          color: '#D83A76',
          smallIcon: 'ic_notification_2', // optional, defaults to 'ic_launcher'
          pressAction: {
            id: 'default',
          },
          // sound: 'default',
          // style: {
          //   type: AndroidStyle.INBOX,
          //   lines: ['First Message', 'Second Message', 'Third Message', 'Forth Message'],
          // },
        },
      });
    }
  }

  const checkToken = async () => {
    // const defaultAppMessaging = await firebase
    //   .messaging()
    //   .registerDeviceForRemoteMessages();
    // console.log({defaultAppMessaging});
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      token = fcmToken;
      console.log({fcmToken});
    }
  };

  // const handleLogout = async () => {
  //   pb.authStore.clear();
  //   auth()
  //     .signOut()
  //     .then(() => navigation.navigate('Login'));
  // };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <Text>HomeScreen</Text>
        {/* {token ? <Text>{token}</Text> : null} */}
        {/* <Button
          title={getRemoteConfigValue('button_alert').asString()}
          onPress={async () => {
            Alert.alert('hello this is alert info');
            await analytics().logEvent('alert_info', {
              alert_info: 'try',
            });
          }}
        /> */}
        <Button title={'notifikasi'} onPress={onDisplayNotification} />
        <Button title={'notifikasi screen'} onPress={() => navigation.navigate('Notification')} />
        <Button title={'notifikasi Example Android'} onPress={() => navigation.navigate('NotificationExample')} />
        <Button title={'notifikasi Example iOS'} onPress={() => navigation.navigate('NotificationExIos')} />
        {/* <Button
          title={getRemoteConfigValue('button_next_testing').asString()}
          onPress={() => navigation.navigate('Testing')}
        />
        <Button title={'Chat'} onPress={() => navigation.navigate('Chat')} />
        <Button
          title={getRemoteConfigValue('button_exit').asString()}
          onPress={() => {
            Alert.alert('Exit App', 'are you sure want exit app?', [
              {
                text: getRemoteConfigValue('button_cancel_alert').asString(),
                onPress: async () =>
                  await analytics().logEvent('logout', {
                    logoutUser: 'true',
                  }),
                style: 'cancel',
              },
              {
                text: getRemoteConfigValue('button_ok_alert').asString(),
                onPress: async () =>
                  await analytics().logEvent('logout', {
                    logoutUser: 'true',
                  }),
              },
            ]);
          }}
        /> */}

        <Button title="Logout" onPress={() => handleLogout()} />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
