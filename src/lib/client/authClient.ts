import axios from 'axios';
import { defaultClient } from '@lib/client/index.ts';
import { logout } from '@lib/api/auth.ts';
import { Config } from 'react-native-config';

const authClient = axios.create({
  baseURL: Config.PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

authClient.interceptors.request.use(
  async config => {
    const accessToken = localStorage.getItem('access');
    if (!accessToken) {
      return config;
    }

    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  () => {},
);

authClient.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401) {
      try {
        await defaultClient.post('/auth/refresh').then(res => {
          localStorage.setItem('access', res.data.accessToken);
        });

        return authClient(error.config);
      } catch (refreshError) {
        await logout();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export default authClient;
