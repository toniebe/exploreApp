import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import notifee, {
  AndroidBadgeIconType,
  AndroidCategory,
  AndroidColor,
  AndroidImportance,
  AndroidLaunchActivityFlag,
  AndroidStyle,
  AndroidVisibility,
  TriggerType,
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
        'FAKTA MENARIK SEPUTAR KESEHATAN GIGI, NOMOR 3 BIKIN KAMU MERINDING',
      body: 'Postingan baru medstalk: dr. Bahagia',
      android: {
        channelId: channelId,
        color: '#D83A76',
        smallIcon: 'ic_notification_3',
        largeIcon:
          'https://dk4fkkwa4o9l0.cloudfront.net/production/uploads/article/image/676/male-professional-dentist-with-gloves-mask-discuss-what-treatment-will-look-like-patient-s-teeth.jpg',
        timestamp: Date.now(),
        showTimestamp: true,
        style: {
          type: AndroidStyle.BIGPICTURE,
          picture:
            'https://dk4fkkwa4o9l0.cloudfront.net/production/uploads/article/image/676/male-professional-dentist-with-gloves-mask-discuss-what-treatment-will-look-like-patient-s-teeth.jpg',
          title:
            'FAKTA MENARIK SEPUTAR KESEHATAN GIGI, NOMOR 3 BIKIN KAMU MERINDING',
          summary: 'Postingan baru medstalk: dr. Bahagia',
        },
        actions: [
          {
            title: '<p style="color: #D83A76;"><b>SUKA</b></p>',
            icon: 'https://my-cdn.com/icons/reply.png',
            pressAction: {
              id: 'play',
            },
          },
          {
            title: '<p style="color:#D83A76;"><b>BERI KOMENTAR</b></p>',
            icon: 'https://my-cdn.com/icons/reply.png',
            pressAction: {
              id: 'nonaktifkan',
            },
            input: true,
          },
          {
            title: '<p style="color: #D83A76;"><b>BOOKMARK</b></p>',
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
      title: 'Han so hee',
      body: 'Masih sakit perut dan sedikit merasa mual dok!',
      android: {
        channelId: channelId,
        color: '#D83A76',
        smallIcon: 'ic_notification_3',
        // timestamp: Date.now(),
        showTimestamp: true,
        style: {
          type: AndroidStyle.MESSAGING,
          person: {
            name: 'dr. Bahagia',
            icon: 'https://asset-2.tstatic.net/tribunnews/foto/bank/images/dikta-mundur-dari-yovie-and-nuno.jpg',
          },
          messages: [
            {
              text: 'Hey, how are you?',
              timestamp: Date.now() - 600000, // 10 minutes ago
            },
            {
              text: 'Masih sakit perut dan sedikit merasa mual dok!',
              timestamp: Date.now(), // Now
              person: {
                name: 'Han so hee',
                icon: 'https://www.blibli.com/friends-backend/wp-content/uploads/2023/11/B1100592-Cover-Drama-Han-So-Hee.jpg',
              },
            },
          ],
        },
        actions: [
          {
            title: '<p style="color: #D83A76;">SUKA</p>',
            icon: 'https://my-cdn.com/icons/reply.png',
            pressAction: {
              id: 'like',
            },
          },
          {
            title: '<p style="color:#D83A76;">BALAS</p>',
            icon: 'https://my-cdn.com/icons/reply.png',
            pressAction: {
              id: 'reply',
            },
            input: true,
          },
        ],
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
    // notifee.registerForegroundService(notification => {
    //   return new Promise(() => { });
    // });

    notifee.displayNotification({
      title: '<p style="color: #D83A76;"><b>D2D</b></p>',
      body: '<p style="color: #FFFFFF;"><b>Sampai pada<b> <span style="color: #D83A76;">07:20 PM - 07:35PM</span></p>',
      android: {
        channelId: channelId,
        color: '#D83A76',
        smallIcon: 'ic_notification_3',
        timestamp: Date.now(),
        showTimestamp: true,
        progress: {
          current: 70,
          max: 100,
        },
        style: {
          type: AndroidStyle.BIGTEXT,
          summary:
            '<p style="color: #D83A76;"><b>D2D</b><span>Dkonsul</span></p>',
          title:
            '<p><b>Sampai pada<b> <span style="color: #D83A76;">07:20 PM - 07:35PM</span></p>',
          text: 'Obat sedang diantar ke rumahmu, mohon ditunggu ya!',
        },
      },
    });

    // await notifee.stopForegroundService();
  };

  const callNotification = async () => {
    notifee.createChannel({
      id: 'test',
      name: 'Firing alarms & timers',
      lights: false,
      vibration: true,
      importance: AndroidImportance.HIGH,
      sound: 'wa',
    });

    const timestampDate = new Date(Date.now());
    timestampDate.setSeconds(timestampDate.getSeconds() + 5); //now + 5 seconds
    console.log(timestampDate.getTime());

    // Create a time-based trigger
    const trigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: timestampDate.getTime(), // fire at 11:10am (10 minutes before meeting)
    };

    // Create a trigger notification
    await notifee.createTriggerNotification(
      {
        title: 'Han',
        body: 'Body',
        android: {
          channelId: 'test',
          category: AndroidCategory.CALL,
          visibility: AndroidVisibility.PUBLIC,
          importance: AndroidImportance.HIGH,
          timestamp: Date.now(),
          showTimestamp: true,

          pressAction: {
            id: 'default',
            launchActivity: 'com.exploreapp.CustomActivity',
          },
          actions: [
            {
              title: 'TOLAK',
              pressAction: {
                id: 'option2',
              },
            },
            {
              title: 'JAWAB',
              pressAction: {
                id: 'option1',
                launchActivity: 'com.exploreapp.CustomActivity',
              },
            },
          ],
          fullScreenAction: {
            id: 'default',
            launchActivity: 'com.exploreapp.CustomActivity',
          },
        },
      },
      trigger,
    );
  };

  return (
    <View>
      <Button title="Big Picture Notification" onPress={YoutubeNotification} />
      <Button title="Messaging Notification" onPress={FacebookNotification} />
      <Button title="Progress Notification" onPress={GrabNotification} />
      <Button title="Call Notification" onPress={callNotification} />
    </View>
  );
};

export default NotificationExample;

const styles = StyleSheet.create({});
