import React from 'react';
import { FlatList, View } from 'react-native';
import TagChip from '@components/tag/TagChip.tsx';
import { Tag } from '@lib/types/Post.ts';

const TagList = () => {
  const data: Tag[] = [
    {
      id: 1,
      label: '보험',
    },
    {
      id: 2,
      label: '알바',
    },
    {
      id: 3,
      label: '자취',
    },
  ];
  return (
    <FlatList
      horizontal
      data={data}
      renderItem={({ item }) => (
        <TagChip data={item} onPress={() => {}} selected={false} />
      )}
      ItemSeparatorComponent={() => <View style={{ width: 8 }} />} // 세로 간격
    />
  );
};

export default TagList;
