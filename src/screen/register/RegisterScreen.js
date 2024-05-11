import { StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import Button from '../../component/Button';
import auth from '@react-native-firebase/auth';
import { pb } from '../../helper/pocketbase';

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disable, setDisable] = useState(false);
  const handleRegister = async () => {
    setDisable(true);

    try {
      const data = {
        email: email,
        username: `User-${Math.random(0, 100)}`,
        password,
        passwordConfirm: password,
        name: `UserName-${Math.random(0, 100)}`,
        emailVisibility: true,
      };

      const createdUser = await pb.collection('users').create(data);

      console.log('tonlog created user', createdUser);

      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(data => {
          let user = JSON.stringify(data.user);

          setEmail('');
          setPassword('');
          setTimeout(() => navigation.replace('Login'), 2000);
          setDisable(false);
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            setDisable(false);
          }

          if (error.code === 'auth/invalid-email') {
            setDisable(false);
          }
        });
    } catch (err) {
      console.log('err: ', err);
    }
  };
  return (
    <View style={styles.container}>
      <Text>RegisterScreen</Text>
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

      <Button title={'Register'} onPress={handleRegister} disabled={disable} />
      <Button
        title="go to login"
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
};

export default RegisterScreen;

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
