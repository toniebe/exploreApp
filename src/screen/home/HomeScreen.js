import {
  Alert,
  BackHandler,
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

const HomeScreen = ({navigation, route}) => {
  let token = null;
  useEffect(() => {
    refreshRemoteConfig();
    remoteConfigSetting()
    checkToken();
  }, []);

  const remoteConfigSetting = async () => {
    await remoteConfig().setConfigSettings({
      isDeveloperModeEnabled: true,
      minimumFetchInterval: 0,
    });
  };

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

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <Text>HomeScreen</Text>
        {token ? <Text>{token}</Text> : null}
        <Button
          title={getRemoteConfigValue('button_alert').asString()}
          onPress={async () => {
            Alert.alert('hello this is alert info');
            await analytics().logEvent('alert_info', {
              alert_info: 'try',
            });
          }}
        />
        <Button
          title={getRemoteConfigValue('button_next_testing').asString()}
          onPress={() => navigation.navigate('Testing')}
        />
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
        />
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
