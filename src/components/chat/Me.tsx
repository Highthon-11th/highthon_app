import { COLOR } from '@/styles/color/color';
import React from 'react';
import { Text, View } from 'react-native';

type Props = {
  message: string;
};
const Me = ({ message }: Props) => {
  return (
    <View
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'flex-end',
      }}
    >
      <Text
        style={{
          paddingHorizontal: 16,
          paddingVertical: 8,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: COLOR.black,
          borderWidth: 1,
          borderColor: COLOR.stroke,
          borderRadius: 8,
        }}
      >
        {message}
      </Text>
    </View>
  );
};

export default Me;
