import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import Button from '../../component/Button';
import {useRealm} from '@realm/react';
import {dataCallPlan} from '../../schema/data';
import {useCallPlanOperations} from '../../schema/query';

const RealmPage = () => {
  const [callPlanId, setcallPlanId] = useState('');
  const [data, setData] = useState(null);
  const {insertCallPlan, deleteAll, deleteCallPlan, searchCallPlan} =
    useCallPlanOperations();

  return (
    <View style={styles.container}>
      <View style={{marginVertical: 20}}>
        <Text>RealmPage</Text>
        <Button
          title="Synchronize"
          onPress={() => insertCallPlan(dataCallPlan[0], true)}
        />
      </View>
      <View style={{marginVertical: 20}}>
        <Text>Search Here:</Text>
        <TextInput
          value={callPlanId}
          onChangeText={txt => setcallPlanId(txt)}
          placeholder={'Search Call Plann'}
          style={styles.input}
        />
        <Button
          title="Find"
          onPress={() => {
            setData(searchCallPlan(callPlanId));
          }}
        />
      </View>

      {data ? (
        <View>
          <Text>Data:</Text>
          <Text>{JSON.stringify(data)}</Text>
        </View>
      ) : null}

      <Button
        title="Delete"
        onPress={() => {
          deleteCallPlan(callPlanId);
        }}
      />
    </View>
  );
};

export default RealmPage;

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
