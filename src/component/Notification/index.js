import { AppRegistry, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const NotificationCustom = () => {

    
  return (
    <View style={{backgroundColor:'khaki'}}>
      <Text>NotificationCustom</Text>
    </View>
  )
}

export default NotificationCustom

AppRegistry.registerComponent('custom-component', () => NotificationCustom);

const styles = StyleSheet.create({})