import React from 'react';
import { Image, SafeAreaView, Text, View } from 'react-native';
import { COLOR } from '@styles/color/color.ts';
import Logo from '../../assets/login_logo.png';
import { body1 } from '@styles/typography/body.ts';
import { login } from '@lib/api/auth.ts';
import KakaoButton from '@components/KakaoButton.tsx';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView
      style={{
        flex: 1,

        backgroundColor: COLOR.main, // Set the background color to white
      }}
    >
      <Image
        source={Logo}
        width={250}
        height={88}
        style={{
          width: 250,
          height: 88,
          position: 'absolute',
          top: '40%',
          alignSelf: 'center',
        }}
      />
      <Text
        style={[
          body1,
          {
            color: '#ffffff',
            position: 'absolute',
            alignSelf: 'center',
            bottom: '20%',
            textAlign: 'center',
          },
        ]}
      >
        {'막막한 사회 속에서\n인생선배를 찾아 좋은 첫단추 채우자'}
      </Text>

      <View style={{ flex: 1 }} />
      <View style={{ paddingHorizontal: 20, paddingVertical: 12 }}>
        <KakaoButton
          onPress={() => {
            login()
              .then(() => {
                navigation.navigate('Home');
              })
              .catch(error => {
                console.error('로그인 실패:', error);
              });
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
