import PocketBase from 'pocketbase'
import eventsource from 'react-native-sse';

export const pb = new PocketBase('http://127.0.0.1:8090');
global.EventSource = eventsource;