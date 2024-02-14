import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
//import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

const DailyAcctNotifications = () => {
  let scheduledNotificationId = null;

  const scheduleNotification = async () => {
    try {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);

      if (status !== 'granted') {
        console.log('Permission to send notifications denied');
        return;
      }

      // Get the current date and time
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth();
      const day = now.getDate();

      // Schedule the notification for 9 PM daily
      const trigger = new Date(year, month, day, 9, 15, 0);

      const notification = {
        content: {
          title: 'Check-in Reminder',
          body: 'It is time to check in with your supervisor.',
        },
        trigger,
      };

      scheduledNotificationId = await Notifications.scheduleNotificationAsync(notification);
      console.log('Notification scheduled with ID:', scheduledNotificationId);
    } catch (error) {
      console.error('Error scheduling notification:', error);
    }
  };

  const cancelNotification = async () => {
    if (scheduledNotificationId) {
      await Notifications.cancelScheduledNotificationAsync(scheduledNotificationId);
      console.log('Notification canceled with ID:', scheduledNotificationId);
    } else {
      console.log('No notification is scheduled to be canceled.');
    }
  };

  useEffect(() => {
    scheduleNotification();
  }, []);

  return (
    <View>
      <Text>Your college app</Text>
      <Button title="Schedule Notification" onPress={scheduleNotification} />
      <Button title="Cancel Notification" onPress={cancelNotification} />
    </View>
  );
};
