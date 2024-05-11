import { AppRegistry, Platform, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import notifee, {
  AndroidCategory,
  AndroidColor,
  AndroidImportance,
  AndroidStyle,
  EventType,
} from '@notifee/react-native';
import Button from '../../component/Button';

const Notification = () => {
  const [countBadge, setBadge] = useState(0);
  async function onDisplayNotification() {
    // Request permissions (required for iOS)
    if (Platform.OS === 'ios') {
      await notifee.requestPermission();
      await notifee.displayNotification({
        title: 'Notification Title',
        body: 'Custom sound',
        ios: {
          sound: 'dkonsul.wav',
        },
      });
    }
    // Display a notification=
    if (Platform.OS === 'android') {
      const channelId = await notifee.createChannel({
        id: 'custom-channel2',
        name: 'custom-channel2',
        sound: 'hollow',
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
          smallIcon: 'ic_notification_4', // optional, defaults to 'ic_launcher'
          pressAction: {
            id: 'default',
          },
        },
      });
    }
  }

  async function customNotification() {
    // Request permissions (required for iOS)
    const channelId = await notifee.createChannel({
      id: 'custom-channel2',
      name: 'custom-channel2',
      sound: 'hollow',
      lights: true,
      lightColor: AndroidColor.RED,
      importance: AndroidImportance.HIGH,
    });
    notifee.displayNotification({
      title:
        '<p style="color: #4caf50;"><b>Styled HTMLTitle</span></p></b></p> &#128576;',
      subtitle: '&#129395;',
      body: 'The <p style="text-decoration: line-through">body can</p> also be <p style="color: #ffffff; background-color: #9c27b0"><i>styled too</i></p> &#127881;!',
      android: {
        channelId: channelId,
        color: '#D83A76',
        smallIcon: 'ic_notification_4',
        pressAction: {
          id: 'default',
          mainComponent: 'custom-component',
        },
      },
    });
  }

  const replyNotification = async () => {
    const channelId = await notifee.createChannel({
      id: 'custom-channel4',
      name: 'custom-channel4',
      sound: 'hollow',
      lights: true,
      lightColor: AndroidColor.RED,
      importance: AndroidImportance.HIGH,
    });
    notifee.displayNotification({
      title: 'New message',
      body: 'You have a new message from Sarah!',
      android: {
        channelId: channelId,
        color: '#D83A76',
        smallIcon: 'ic_notification_4',
        actions: [
          {
            title: 'balas',
            icon: 'https://my-cdn.com/icons/reply.png',
            pressAction: {
              id: 'reply',
            },
            input: {
              allowFreeFormInput: true, // set to false
              // choices: ['Yes', 'No', 'Maybe'],
              placeholder: 'Reply to Sarah...',
            }, // enable free text input
          },
          // {
          //   title: 'mark as read',
          //   icon: 'https://my-cdn.com/icons/reply.png',
          //   pressAction: {
          //     id: 'mark-as-read',
          //   },
          // },
          // {
          //   title: 'read later',
          //   icon: 'https://my-cdn.com/icons/reply.png',
          //   pressAction: {
          //     id: 'read-later',
          //   },
          // },
        ],
      },
    });
    // notifee.displayNotification({
    //   title: 'Image uploaded',
    //   body: 'Your image has been successfully uploaded',
    //   android: {
    //     channelId,
    //     style: {
    //       type: AndroidStyle.BIGTEXT,
    //       text: 'Large volume of text shown in the expanded stateLarge volume of text shown in the expanded stateLarge volume of text shown in the expanded stateLarge volume of text shown in the expanded stateLarge volume of text shown in the expanded stateLarge volume of text shown in the expanded stateLarge volume of text shown in the expanded stateLarge volume of text shown in the expanded stateLarge volume of text shown in the expanded stateLarge volume of text shown in the expanded stateLarge volume of text shown in the expanded stateLarge volume of text shown in the expanded state',
    //     },
    //   },
    // });
  };

  const progressNotification = async () => {
    const channelId = await notifee.createChannel({
      id: 'custom-channel8',
      name: 'custom-channel78',
      sound: 'hollow',
      lights: true,
      lightColor: AndroidColor.RED,
      importance: AndroidImportance.HIGH,
    });
    notifee.displayNotification({
      title: 'Campaign activity',
      body: 'youre progress campaign activity post tiktok',
      android: {
        channelId: channelId,
        color: '#D83A76',
        smallIcon: 'ic_notification_4',
        largeIcon:
          'https://www.freepnglogos.com/uploads/tik-tok-logo-png/tik-tok-how-use-tiktok-create-cool-videos-with-iphone-14.png',
        progress: {
          max: 10,
          current: 5,
        },
      },
    });
  };

  const bigPictureNotification = async () => {
    const channelId = await notifee.createChannel({
      id: 'd2d-bigpicture',
      name: 'd2d-bigpicture',
      sound: 'hollow',
      lights: true,
      lightColor: AndroidColor.RED,
      importance: AndroidImportance.HIGH,
    });
    await notifee.displayNotification({
      title: 'Image uploaded',
      body: 'Your image has been successfully uploaded',
      android: {
        channelId: channelId,
        color: '#D83A76',
        smallIcon: 'ic_notification_4',
        style: {
          type: AndroidStyle.BIGPICTURE,
          picture:
            'https://c4.wallpaperflare.com/wallpaper/405/53/139/anime-one-piece-skull-skull-and-bones-wallpaper-preview.jpg',
        },
      },
    });
  };
  const chronoNotification = async () => {
    const channelId = await notifee.createChannel({
      id: 'd2d-fullscreen',
      name: 'd2d-bigpicture',
      sound: 'hollow',
      lights: true,
      lightColor: AndroidColor.RED,
      importance: AndroidImportance.HIGH,
    });
    await notifee.displayNotification({
      title: 'Segera Kerjakan',

      body: 'Tap to claim your time limited prize! Hurry! &#10024;',
      subtitle: 'Prizes',

      android: {
        channelId: channelId,
        color: '#D83A76',
        smallIcon: 'ic_notification_4',
        showChronometer: true,
        chronometerDirection: 'down',
        timestamp: Date.now() + 300000, // 5 minutes
      },
      asForegroundService: true,
    });
  };
  const ongoingNotification = async () => {
    const channelId = await notifee.createChannel({
      id: 'd2d-fullscreen2',
      name: 'd2d-bigpicture',
      sound: 'hollow',
      lights: true,
      lightColor: AndroidColor.RED,
      importance: AndroidImportance.HIGH,
    });
    await notifee.displayNotification({
      body: 'Ongoing notification',
      android: {
        channelId,
        color: '#D83A76',
        smallIcon: 'ic_notification_4',
        category: AndroidCategory.CALL,
        // Recommended to set importance to high
        importance: AndroidImportance.HIGH,
        ongoing: true,
        progress: {
          indeterminate: true,
        },
      },
    });
  };
  const notificationMessaging = async () => {
    const channelId = await notifee.createChannel({
      id: 'd2d-messaging',
      name: 'd2d-messaging',
      sound: 'hollow',
      lights: true,
      lightColor: AndroidColor.RED,
      importance: AndroidImportance.HIGH,
    });
    await notifee.displayNotification({
      body: 'Ongoing notification',
      android: {
        channelId,
        color: '#D83A76',
        smallIcon: 'ic_notification_4',
        style: {
          type: AndroidStyle.MESSAGING,
          person: {
            name: 'John Doe',
            icon: 'https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png',
          },
          messages: [
            {
              text: 'Hey, how are you?',
              timestamp: Date.now() - 600000, // 10 minutes ago
            },
            {
              text: 'Great thanks, food later?',
              timestamp: Date.now(), // Now
              person: {
                name: 'Sarah Lane',
                icon: 'https://w7.pngwing.com/pngs/129/292/png-transparent-female-avatar-girl-face-woman-user-flat-classy-users-icon.png',
              },
            },
          ],
        },
      },
    });
  };

  async function notificationSetBadge() {
    // Request permissions (required for iOS)
    if (Platform.OS === 'ios') {
      await notifee.requestPermission();
      await notifee.displayNotification({
        title: 'Notification Title',
        body: 'Custom sound',
        ios: {
          sound: 'hollow.wav',
        },
      });
      await notifee
        .incrementBadgeCount()
        .then(() => notifee.getBadgeCount())
        .then(count => {
          setBadge(count + 1);
        });
    }
  }

  async function notificationWithAttachment() {
    // Request permissions (required for iOS)
    if (Platform.OS === 'ios') {
      await notifee.requestPermission();
      await notifee.displayNotification({
        title: 'Notification Title',
        body: 'Custom sound',
        ios: {
          sound: 'hollow.wav',
          attachments: [
            // {
            //   // iOS resource
            //   url: 'https://www.freepnglogos.com/uploads/tik-tok-logo-png/tik-tok-how-use-tiktok-create-cool-videos-with-iphone-14.png',
            // },
            {
              // React Native asset.
              url: require('../../asset/lex.mp4'),
            },
            // {
            //   // Remote image
            //   url: 'https://c4.wallpaperflare.com/wallpaper/405/53/139/anime-one-piece-skull-skull-and-bones-wallpaper-preview.jpg',
            // },
          ],
          foregroundPresentationOptions: {
            badge: true,
            sound: true,
            banner: true,
            list: true,
          },
        },
      });
      await notifee.getBadgeCount().then(count => {
        console.log('Current badge count: ', count);
        setBadge(count);
      });
      await notifee
        .setBadgeCount(countBadge + 1)
        .then(() => console.log('badge'));
    }
  }
  async function notificationAttachmentAction() {
    // Request permissions (required for iOS)
    if (Platform.OS === 'ios') {
      await notifee.requestPermission();
      await notifee.setNotificationCategories([
        {
          id: 'post',
          summaryFormat: 'You have %u+ unread messages from %@.',
          actions: [
            {
              id: 'reply',
              title: 'Reply',
              input: true,
            },
          ],
        },
      ]);
      await notifee.displayNotification({
        title: 'New post from John',
        body: 'Hey everyone! Check out my new blog post on my website.',
        ios: {
          sound: 'hollow.wav',
          categoryId: 'post',
          summaryArgument: 'John',
          summaryArgumentCount: 10,
        },
      });
      await notifee.getBadgeCount().then(count => {
        console.log('Current badge count: ', count);
        setBadge(count);
      });
      await notifee
        .setBadgeCount(countBadge + 1)
        .then(() => console.log('badge'));
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ flex: 1, padding: 10, backgroundColor: 'khaki' }}>
        <Text>Notification Behaviour Android</Text>
        <Button title="Normal Notification" onPress={onDisplayNotification} />
        <Button title="Html notification" onPress={customNotification} />
        <Button title="with Action" onPress={replyNotification} />
        <Button title="progress" onPress={progressNotification} />
        <Button title="big picture" onPress={bigPictureNotification} />
        <Button title="ongoing" onPress={ongoingNotification} />
        <Button title="chrono notification" onPress={chronoNotification} />
        <Button
          title="messaging notification"
          onPress={notificationMessaging}
        />
      </View>
      <View style={{ flex: 1, padding: 10, backgroundColor: 'pink' }}>
        <Text>Notification Behaviour ios</Text>
        <Button title="Normal Notification" onPress={onDisplayNotification} />
        <Button
          title="Normal Notification With setBadge"
          onPress={notificationSetBadge}
        />
        <Button
          title="Normal Notification With Attachment"
          onPress={notificationWithAttachment}
        />
        <Button
          title="Notification With Action"
          onPress={notificationAttachmentAction}
        />
      </View>
      <View></View>
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({});
