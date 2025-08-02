import { User } from '@lib/types/User.ts';
import { defaultClient, authClient } from '@lib/client';
import { Token } from '@lib/types/Token.ts';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const login = async (idToken: string) => {
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
