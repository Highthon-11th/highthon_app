import axios from 'axios';
import { defaultClient } from '@lib/client/index.ts';
import { logout } from '@lib/api/auth.ts';
import { Config } from 'react-native-config';
import AsyncStorage from '@react-native-async-storage/async-storage';



const authClient = axios.create({
  baseURL: Config.PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

authClient.interceptors.request.use(
  async config => {
    const accessToken = await AsyncStorage.getItem('access');
    if (!accessToken) {
      return config;
    }

    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  error => Promise.reject(error),
);

authClient.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401) {
      try {
        const res = await defaultClient.post('/auth/refresh');
        await AsyncStorage.setItem('access', res.data.accessToken);

        const originalRequest = error.config;
        originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`;
        return authClient(originalRequest);
      } catch (refreshError) {
        await logout();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export default authClient;
