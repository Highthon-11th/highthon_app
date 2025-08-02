import React from 'react';
import { FlatList } from 'react-native';
import PostCard from '@components/post/PostCard.tsx';
import { useSuspenseQuery } from '@tanstack/react-query';
import postQuery from '@lib/query/postQuery.ts';
import { useNavigation } from '@react-navigation/native';

interface Props {
  selectedTags: number[];
}

const PostCardList = ({ selectedTags }: Props) => {
  const { data } = useSuspenseQuery(postQuery.list(selectedTags));
  const navigation = useNavigation();

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <PostCard
          data={item}
          onPress={() => navigation.navigate('Question', { post: item })}
        />
      )}
      keyExtractor={item => item.id}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default PostCardList;
