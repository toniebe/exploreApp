import { AppRegistry, NativeModules, RootTagContext, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Button from '../../component/Button'
import { useNavigation } from '@react-navigation/native'
import App from '../../../App'

const NotificationCustom = () => {
  // const navigation = useNavigation();
  const appRegis = () => {
    RootTagContext.displayName('exploreApp');
  // AppRegistry.getRunnable('exploreApp').run({
  //   initialProps:{},
  //   rootTag: 
  // })
  }
  return (
    <View style={{ backgroundColor: 'khaki' }}>
      <Text>NotificationCustom</Text>
      <Text>Test 132</Text>
      <Button
        title='Back to APp'
        onPress={() => appRegis()}


      />
    </View>
  )
}

export default NotificationCustom



const styles = StyleSheet.create({})