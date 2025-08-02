import { Button, SafeAreaView, Text } from 'react-native';
import { Config } from 'react-native-config';
import { KakaoOAuthToken, login } from '@react-native-seoul/kakao-login';
import { useState } from 'react';

const HomeScreen = () => {
  const [idToken, setIdToken] = useState<string>('');
  const [accessToken, setAccessToken] = useState<string>('');
  const [refreshToken, setRefreshToken] = useState<string>('');

  return (
    <SafeAreaView>
      <Text>{Config.PUBLIC_API_URL}</Text>
      <Text>{Config.PUBLIC_API_URL}asdfjslkj</Text>
      <Button
        title={'jksadfj'}
        onPress={async () => {
          const token: KakaoOAuthToken = await login();

          setIdToken(token.idToken);
          setAccessToken(token.accessToken);
          setRefreshToken(token.refreshToken);
        }}
      />
      <Text>idToken: {idToken}</Text>
      <Text>accessToken: {accessToken}</Text>
      <Text>refreshToken: {refreshToken}</Text>
    </SafeAreaView>
  );
};

export default HomeScreen;
