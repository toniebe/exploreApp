import {Platform, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Button from '../../component/Button';
import notifee from '@notifee/react-native';

const NotificationExIos = () => {
  async function notificationWithAttachment() {
    // Request permissions (required for iOS)
    if (Platform.OS === 'ios') {
      await notifee.requestPermission();
      await notifee.displayNotification({
        title: 'Postingan baru medstalk: dr. Bahagia',
        body: 'FAKTA MENARIK SEPUTAR KESEHATAN GIGI, NOMOR 3 BIKIN KAMU MERINDING',
        subtitle: 'D2D',
        ios: {
          sound: 'hollow.wav',
          attachments: [
            {
              // React Native asset.
              url: require('../../asset/lex.mp4'),
              thumbnailHidden: true,
            },
          ],

          foregroundPresentationOptions: {
            badge: true,
            sound: true,
            banner: true,
            list: true,
          },
        },
      });
    }
  }
  async function notificationWithAttachmentThumbnail() {
    // Request permissions (required for iOS)
    if (Platform.OS === 'ios') {
      await notifee.requestPermission();
      await notifee.displayNotification({
        title: 'Postingan baru medstalk: dr. Bahagia',
        body: 'FAKTA MENARIK SEPUTAR KESEHATAN GIGI, NOMOR 3 BIKIN KAMU MERINDING',
        ios: {
          sound: 'hollow.wav',
          attachments: [
            {
              url: require('../../asset/test.gif'),
              thumbnailHidden: false,
            },
            {
              url: require('../../asset/video2.mp4'),
              thumbnailHidden: false,
              thumbnailTime: 3,
            },
          ],
          foregroundPresentationOptions: {
            badge: true,
            sound: true,
            banner: true,
            list: true,
          },
        },
      });
    }
  }

  async function notificationWithAction() {
    // Request permissions (required for iOS)
    if (Platform.OS === 'ios') {
      await notifee.setNotificationCategories([
        {
          id: 'post',
          actions: [
            {
              id: 'view-post',
              title: 'Suka',
              foreground: true,
            },
            {
              id: 'comment-post',
              title: 'Komentar',
              foreground: true,
              input: true,
            },
            {
              id: 'bookmark-post',
              title: 'Boomark',
              foreground: true,
            },
          ],
        },
      ]);
      await notifee.displayNotification({
        title: 'Postingan baru medstalk: dr. Bahagia',
        body: 'FAKTA MENARIK SEPUTAR KESEHATAN GIGI, NOMOR 3 BIKIN KAMU MERINDING',
        ios: {
          sound: 'hollow.wav',
          categoryId: 'post',
          foregroundPresentationOptions: {
            badge: true,
            sound: true,
            banner: true,
            list: true,
          },
        },
      });
    }
  }
  return (
    <View>
      <Button title="Action Notification" onPress={notificationWithAction} />
      {/* <Button
        title="Attachment Notification"
        onPress={notificationWithAttachment}
      /> */}
      <Button
        title="thumbnail Notification"
        onPress={notificationWithAttachmentThumbnail}
      />
    </View>
  );
};

export default NotificationExIos;

const styles = StyleSheet.create({});
