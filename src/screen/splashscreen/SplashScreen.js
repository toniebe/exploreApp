import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import remoteConfig from '@react-native-firebase/remote-config';
import messaging from '@react-native-firebase/messaging';
import analytics from '@react-native-firebase/analytics';

export default function SplashScreen({navigation}) {
  const [fcmToken, setFcmToken] = useState('');
  useEffect(() => {
    remoteConfig()
      .setDefaults({
        awesome_new_feature: 'disabled',
      })
      .then(() => remoteConfig().fetchAndActivate())
      .then(fetchedRemotely => {
        if (fetchedRemotely) {
          console.log('Configs were retrieved from the backend and activated.');
        } else {
          console.log(
            'No configs were fetched from the backend, and the local configs were already activated',
          );
        }
        navigation.navigate('Home');
      });
    // checkToken();
    getPermission();
    enabledAnalytics();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const enabledAnalytics = async () => {
    await analytics().setAnalyticsCollectionEnabled(true);
  };

  const getPermission = async () => {
    const authorizationStatus = await messaging().requestPermission();

    if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
      console.log('User has notification permissions enabled.');
    } else if (
      authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL
    ) {
      console.log('User has provisional notification permissions.');
    } else {
      console.log('User has notification permissions disabled');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Explore App Test</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
