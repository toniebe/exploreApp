import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {pb} from '../../helper/pocketbase';
import Button from '../../component/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Chat = ({navigation}) => {
  const [dataMessage, setDataMessage] = useState([]);
  const [message, setMessage] = useState('');
  const flatlistRef = useRef();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const unsubscribe = async () => {
    await pb.collection('messages').subscribe('*', async ({action, record}) => {
      fetchMessage();
    });
  };

  const fetchMessage = async () => {
    const resultList = await pb
      .collection('messages')
      .getList(1, 50, {sort: '-created', expand: 'user'});
    setDataMessage(resultList.items);
  };
  useEffect(() => {
    fetchMessage();
    unsubscribe();
    return () => {
      unsubscribe();
    };
  }, []);

  const sendMessage = async () => {
    const idPB = await AsyncStorage.getItem('userPB');
    const dataPocketBase = JSON.parse(idPB);
    console.log('data pocket', dataPocketBase);
    const data = {
      text: message,
      user: dataPocketBase.id,
    };
    const createMessage = await pb.collection('messages').create(data);

    setMessage('');
  };

  const ChatItem = ({username = 'username1', text = 'hello mom'}) => {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Image
          source={{uri: 'https://random.imagecdn.app/500/150'}}
          style={{width: 100, height: 100}}
        />
        <Text>
          sent by <Text style={{fontWeight: '500'}}>{username}</Text>
        </Text>
        <Text style={{color: 'black', fontSize: 18, fontWeight: '500'}}>
          {text}
        </Text>
      </View>
    );
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <FlatList
        ref={flatlistRef}
        data={dataMessage}
        renderItem={({item}) => (
          <ChatItem username={item?.expand?.user?.username} text={item?.text} />
        )}
      />
      <TextInput
        placeholder="masukan pesan"
        style={{
          borderWidth: 1,
          paddingVertical: 10,
          paddingHorizontal: 5,
          borderColor: '#EEEEEE',
          marginVertical: 20,
        }}
        onChangeText={text => setMessage(text)}
        value={message}
      />
      <Button title="Kirim" onPress={() => sendMessage()} />
      <Button title="Back" onPress={() => navigation.goBack()} />
    </SafeAreaView>
  );
};

export default Chat;

const styles = StyleSheet.create({});
