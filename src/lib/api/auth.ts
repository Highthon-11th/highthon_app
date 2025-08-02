import { User } from '@lib/types/User.ts';
import { defaultClient, authClient } from '@lib/client';
import { Token } from '@lib/types/Token.ts';
import {
  getProfile,
  loginWithKakaoAccount,
} from '@react-native-seoul/kakao-login';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const login = async () => {
  const { idToken } = await loginWithKakaoAccount();
  const { data } = await defaultClient.post<Token>(
    '/auth/login/oauth?provider=KAKAO',
    {
      idToken,
    },
  );
  await Promise.all([
    AsyncStorage.setItem('refresh', data.refreshToken),
    AsyncStorage.setItem('access', data.accessToken),
  ]);
  return data;
};

export const logout = async () => {};

export const getMe = async () => {
  const { data } = await authClient.get<User>('/auth/me');

  return data;
};

export const getUser = async (id: string) => {
  const { data } = await authClient.get<User>(`/user/${id}`);

  return data;
};
