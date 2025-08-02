import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

type CategoryProps = {
  title: string;
};
const Category = ({ title }: CategoryProps) => {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  return (
    <TouchableOpacity onPress={() => setIsClicked(prev => !prev)}>
      <View
        style={{
          alignSelf: 'flex-start',
          paddingHorizontal: 12,
          height: 30,
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
          borderRadius: 8,
          backgroundColor: isClicked ? '#5B57F4' : '#FFFFFF',
          borderColor: isClicked ? '#5B57F4' : '#D9D9D9',
          borderWidth: 1,
        }}
      >
        <Text
          style={{
            color: isClicked ? '#ffffff' : '#00000',
            fontSize: 12,
            fontWeight: 'medium',
          }}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Category;
