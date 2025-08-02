import React from 'react';
import { FlatList } from 'react-native';
import PostCard from '@components/post/PostCard.tsx';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import postQuery from '@lib/query/postQuery.ts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

interface Props {
  selectedTags: number[];
}

const PostCardList = ({ selectedTags }: Props) => {
  const { data } = useSuspenseQuery(postQuery.list(selectedTags));
  const navigation = useNavigation();

  // 게시글 클릭 핸들러
const handlePostClick = async (postId: string) => {
  try {
    await AsyncStorage.setItem('communityId', postId);
    navigation.navigate('Question' as never);
    
  } catch (error) {
    console.error('에러 발생:', error);
  }
};
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <PostCard 
          data={item} 
          onPress={() => handlePostClick(item.id)}
        />
      )}
      keyExtractor={item => item.id}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default PostCardList;