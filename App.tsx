import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from './src/screen/splashscreen/SplashScreen';
import HomeScreen from './src/screen/home/HomeScreen';
import TestingScreen from './src/screen/testingscreen/TestingScreen';
import RegisterScreen from './src/screen/register/RegisterScreen';
import LoginScreen from './src/screen/Login/LoginScreen';
import Chat from './src/screen/Chat';
import notifee, {AuthorizationStatus} from '@notifee/react-native';
import {PermissionsAndroid, Platform} from 'react-native';
import Notification from './src/screen/Notification/Notification';
import NotificationExample from './src/screen/NotificationExample';
import NotificationExIos from './src/screen/NotificationExIos';
import RealmPage from './src/screen/Realm';
import Realm from 'realm';
import { RealmProvider } from '@realm/react';
import { CallPlan } from './src/schema';

const Stack = createNativeStackNavigator();

const App = () => {
  async function checkNotificationPermission() {
    const settings = await notifee.getNotificationSettings();

    if (settings.authorizationStatus == AuthorizationStatus.AUTHORIZED) {
      console.log('Notification permissions has been authorized');
    } else if (settings.authorizationStatus == AuthorizationStatus.DENIED) {
      console.log('Notification permissions has been denied');
    }
  }

  const requestCameraPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Cool Photo App Camera Permission',
            message:
              'Cool Photo App needs access to your camera ' +
              'so you can take awesome pictures.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO,
        );
      }
    } catch (err) {
      console.warn(err);
    }
  };
  useEffect(() => {
    checkNotificationPermission();
    requestCameraPermission();
  }, []);
  return (
    <RealmProvider schema={[CallPlan]}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Chat"
          component={Chat}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Notification"
          component={Notification}
          // options={{ headerShown: false }}
        />
        <Stack.Screen
          name="NotificationExample"
          component={NotificationExample}
          // options={{ headerShown: false }}
        />
        <Stack.Screen
          name="NotificationExIos"
          component={NotificationExIos}
          // options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RealmPage"
          component={RealmPage}
          // options={{ headerShown: false }}
        />
        <Stack.Screen name="Testing" component={TestingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </RealmProvider>
  );
};

export default App;
