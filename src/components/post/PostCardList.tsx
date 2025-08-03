import React from 'react';
import { FlatList, RefreshControl } from 'react-native';
import PostCard from '@components/post/PostCard.tsx';
import { useSuspenseQuery } from '@tanstack/react-query';
import postQuery from '@lib/query/postQuery.ts';
import { useNavigation } from '@react-navigation/native';

interface Props {
  selectedTags: number[];
}

const PostCardList = ({ selectedTags }: Props) => {
  const { data, refetch } = useSuspenseQuery(postQuery.list(selectedTags));
  const navigation = useNavigation();

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refetch().then(() => setRefreshing(false));
  }, [refetch]);

  return (
    <FlatList
      data={data}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
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
