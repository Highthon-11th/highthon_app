import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Kakao from '@components/Kakao.tsx';
import { body2 } from '@styles/typography/body.ts';

interface KakaoButtonProps {
  onPress: () => void;
}

const KakaoButton = ({ onPress }: KakaoButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container]}
      activeOpacity={0.6}
    >
      <Kakao />
      <Text style={body2}>카카오 로그인</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FEE500',
    width: '100%',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 28,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
});

export default KakaoButton;
