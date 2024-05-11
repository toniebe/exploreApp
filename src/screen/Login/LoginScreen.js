import { StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import Button from '../../component/Button';
import auth from '@react-native-firebase/auth';
import { pb } from '../../helper/pocketbase';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disable, setDisable] = useState(false);
  const handleRegister = async () => {
    setDisable(true);

    try {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(async data => {
          console.log('tonlog data: ', data.user);
          const record = await pb
            .collection('users')
            .getFirstListItem(`email="${email}"`)
            .catch(async () => {
              // const data = {
              //   email: email,
              //   username: `User-${Math.random(0, 100)}`,
              //   password,
              //   passwordConfirm: password,
              //   name: `UserName-${Math.random(0, 100)}`,
              //   emailVisibility: true,
              // };
              // const createdUser = await pb.collection('users').create(data);
              // if (createdUser) {
              //   AsyncStorage.setItem('userPB', JSON.stringify(createdUser));
              // }
              // console.log('tonlog createdUser', createdUser);
            });
          if (record) {
            AsyncStorage.setItem('userPB', JSON.stringify(record));
          }
          console.log('tonlog record', record);
          navigation.replace('Home');
        })
        .catch(err => {
          console.log(err);
        });
    } catch (err) {
      console.log('err:', err);
    }
  };
  return (
    <View style={styles.container}>
      <Text>LoginScreen</Text>
      <TextInput
        value={email}
        onChangeText={email => setEmail(email)}
        placeholder={'Email@example.com'}
        style={styles.input}
      />
      <TextInput
        value={password}
        onChangeText={password => setPassword(password)}
        placeholder={'Password'}
        secureTextEntry={true}
        style={styles.input}
      />

      <Button title={'Login'} onPress={handleRegister}  />
      <Button
        title="go to register"
        onPress={() => navigation.navigate('Register')}
      />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
