/**
 * @format
 */


import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';
import NotificationCustom from './src/screen/NotificationCustom';

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    console.log("Message handled in the background!", remoteMessage);
    if (remoteMessage) {
        console.log('background remote', remoteMessage)
        // checkNotificationConsultation(remoteMessage);
        // onDisplayRNNotification(remoteMessage);
    }
});



AppRegistry.registerComponent('custom-component', () => NotificationCustom);
AppRegistry.registerComponent(appName, () => App);
