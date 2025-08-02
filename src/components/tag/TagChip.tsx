import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Tag } from '@lib/types/Post.ts';

interface Props {
  data: Tag;
  selected: boolean;
  onPress?: (tag: Tag) => void;
}

const TagChip = ({ data, selected, onPress }: Props) => {
  return (
    <TouchableOpacity onPress={() => onPress && onPress(data)}>
      <View
        style={{
          alignSelf: 'flex-start',
          paddingHorizontal: 12,
          height: 30,
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
          borderRadius: 8,
          backgroundColor: selected ? '#5B57F4' : '#FFFFFF',
          borderColor: selected ? '#5B57F4' : '#D9D9D9',
          borderWidth: 1,
        }}
      >
        <Text
          style={{
            color: selected ? '#ffffff' : '#00000',
            fontSize: 12,
            fontWeight: 'medium',
          }}
        >
          {data.label}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default TagChip;
