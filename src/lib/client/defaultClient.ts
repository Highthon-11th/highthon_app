import axios from 'axios';
import { Config } from 'react-native-config';

const defaultClient = axios.create({
  baseURL: Config.PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default defaultClient;
