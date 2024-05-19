import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import notifee, {
  AndroidBadgeIconType,
  AndroidColor,
  AndroidImportance,
  AndroidLaunchActivityFlag,
  AndroidStyle,
} from '@notifee/react-native';
import Button from '../../component/Button';

const NotificationExample = () => {
  const YoutubeNotification = async () => {
    const channelId = await notifee.createChannel({
      id: 'd2d-bigpicture',
      name: 'd2d-bigpicture',
      sound: 'dkonsul',
      lights: true,
      lightColor: AndroidColor.RED,
      importance: AndroidImportance.HIGH,
    });
    await notifee.displayNotification({
      title:
        'GEGE BANGUNIN GOJO, TOJI KAPAN YA DIBANGUNIN DAH PENASARAN PARAHHH',
      body: 'Untuk Anda: VAnimee',
      android: {
        channelId: channelId,
        color: '#D83A76',
        smallIcon: 'ic_notification_3',
        largeIcon:
          'https://c4.wallpaperflare.com/wallpaper/622/941/214/jujutsu-kaisen-satoru-gojo-hd-wallpaper-preview.jpg',
        timestamp: Date.now(),
        showTimestamp: true,
        style: {
          type: AndroidStyle.BIGPICTURE,
          picture:
            'https://c4.wallpaperflare.com/wallpaper/622/941/214/jujutsu-kaisen-satoru-gojo-hd-wallpaper-preview.jpg',
          title:
            'GEGE BANGUNIN GOJO, TOJI KAPAN YA DIBANGUNIN DAH PENASARAN PARAHHH',
          summary: 'Untuk Anda: VAnimee',
        },
        actions: [
          {
            title: '<p style="color: #D83A76;"><b>PUTAR</b></p>',
            icon: 'https://my-cdn.com/icons/reply.png',
            pressAction: {
              id: 'play',
            },
          },
          {
            title: '<p style="color:#D83A76;"><b>NONAKTIFKAN</b></p>',
            icon: 'https://my-cdn.com/icons/reply.png',
            pressAction: {
              id: 'nonaktifkan',
            },
          },
          {
            title: '<p style="color: #D83A76;"><b>TONTON NANTI</b></p>',
            icon: 'https://my-cdn.com/icons/reply.png',
            pressAction: {
              id: 'watch-later',
            },
          },
        ],
      },
    });
  };

  const FacebookNotification = async () => {
    const channelId = await notifee.createChannel({
      id: 'd2d-bigpicture2',
      name: 'd2d-bigpicture2',
      sound: 'dkonsul',
      lights: true,
      lightColor: AndroidColor.RED,
      importance: AndroidImportance.HIGH,
    });
    await notifee.displayNotification({
      body: '<p style="margin-left: 10px;">Ebe Zumaro, Anda memiliki saran teman baru: Han so hee</p>',
      android: {
        channelId: channelId,
        color: '#D83A76',
        smallIcon: 'ic_notification_3',
        largeIcon:
          'https://www.blibli.com/friends-backend/wp-content/uploads/2023/11/B1100592-Cover-Drama-Han-So-Hee.jpg',
        timestamp: Date.now(),
        showTimestamp: true,
        style: {
          type: AndroidStyle.BIGPICTURE,
          picture:
            'https://www.blibli.com/friends-backend/wp-content/uploads/2023/11/B1100592-Cover-Drama-Han-So-Hee.jpg',
          summary:
            '<p style="margin-left: 10px;">Ebe Zumaro, Anda memiliki saran teman baru: Han so hee</p>',
        },
      },
    });
  };

  const GrabNotification = async () => {
    const channelId = await notifee.createChannel({
      id: 'd2d-Grab55',
      name: 'd2d-Grab4',
      sound: 'dkonsul',
      lights: true,
      lightColor: AndroidColor.RED,
      importance: AndroidImportance.HIGH,
    });
    notifee.registerForegroundService(notification => {
      return new Promise(() => {});
    });

    notifee.displayNotification({
      title: '<p style="color: #0a9830;"><b>Grab</b><span>Food</span></p>',
      body: '<p style="color: #FFFFFF;"><b>Sampai pada<b> <span style="color: #0a9830;">07:20 PM - 07:35PM</span></p>',
      android: {
        channelId: channelId,
        color: '#1E1E1E',
        smallIcon: 'ic_notification_3',
        // badgeIconType: AndroidBadgeIconType.SMALL,

        // largeIcon: 'https://www.jagel.id/api/listimage/v/OJEK-MOTOR-0-1655c3805b05ccb4.jpg',
        // circularLargeIcon: true,
        // ongoing: true,
        colorized: true,
        timestamp: Date.now(),
        showTimestamp: true,
        asForegroundService: true,

        progress: {
          current: 70,
          max: 100,
        },
        style: {
          type: AndroidStyle.BIGTEXT,
          summary:
            '<p style="color: #0a9830;"><b>Grab</b><span>Food</span></p>',
          title:
            '<p><b>Sampai pada<b> <span style="color: #0a9830;">07:20 PM - 07:35PM</span></p>',
          text: 'Makananmu sedang diantar ke rumahmu, mohon ditunggu ya!',
        },
      },
    });

    await notifee.stopForegroundService();
  };

  const triggerNotificationWithCustomComponent = async () => {
    console.log('trigger');
    const date = new Date(Date.now());
    date.setSeconds(date.getSeconds() + 3);

    const channelId = await notifee.createChannel({
      id: 'd2d-custom55',
      name: 'd2d-custom3',
      sound: 'dkonsul',
      lights: true,
      lightColor: AndroidColor.RED,
      importance: AndroidImportance.HIGH,
    });

    await notifee.createTriggerNotification(
      {
        title: 'New trigger notification',
        android: {
          channelId: channelId,
          pressAction: {
            id: 'default',
            launchActivity: 'default',
            // launchActivityFlags: [AndroidLaunchActivityFlag.SINGLE_TOP],
            mainComponent: 'custom-component',
          },
        },
      },
      {type: 0, timestamp: date.getTime()},
    );
  };

  return (
    <View>
      <Button title="Youtube Notification" onPress={YoutubeNotification} />
      <Button title="Facebook Notification" onPress={FacebookNotification} />
      <Button title="Grab Notification" onPress={GrabNotification} />
      <Button
        title="Tigger Notification"
        onPress={triggerNotificationWithCustomComponent}
      />
    </View>
  );
};

export default NotificationExample;

const styles = StyleSheet.create({});
