import React, { Dispatch, SetStateAction } from 'react';
import { FlatList, View } from 'react-native';
import TagChip from '@components/tag/TagChip.tsx';
import { useSuspenseQuery } from '@tanstack/react-query';
import tagQuery from '@lib/query/tagQuery.ts';

interface TagListProps {
  selectedTags: number[];
  setSelectedTags: Dispatch<SetStateAction<number[]>>;
}

const TagList = ({ selectedTags, setSelectedTags }: TagListProps) => {
  const { data } = useSuspenseQuery(tagQuery.list);
  return (
    <FlatList
      horizontal
      data={data}
      renderItem={({ item }) => (
        <TagChip
          data={item}
          onPress={() => {
            if (selectedTags.includes(item.id)) {
              setSelectedTags(selectedTags.filter(tagId => tagId !== item.id));
            } else {
              setSelectedTags([...selectedTags, item.id]);
            }
          }}
          selected={selectedTags.includes(item.id)}
        />
      )}
      ItemSeparatorComponent={() => <View style={{ width: 8 }} />} // 세로 간격
    />
  );
};

export default TagList;
