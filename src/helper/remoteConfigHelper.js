import remoteConfig from '@react-native-firebase/remote-config';

export const refreshRemoteConfig = async () => {
  try {
    await remoteConfig().fetch(0);
    await remoteConfig().activate();
  } catch (err) {
    console.log('remoteConfig error ', err);
  }
};

export const getRemoteConfigValue = key => {
  const parameters = remoteConfig().getValue(key);
  return parameters;
};
