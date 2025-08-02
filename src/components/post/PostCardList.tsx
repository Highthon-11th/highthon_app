import React from 'react';
import { Post } from '@lib/types/Post.ts';
import { FlatList } from 'react-native';
import PostCard from '@components/post/PostCard.tsx';

const dummyPosts: Post[] = [
  {
    id: 'd1f9c5a4-5678-4c34-a123-111111111111',
    title: '멘토링 꿀팁 공유해요!',
    content:
      '멘토링할 때는 상대방의 이야기를 잘 들어주는 것이 중요해요. 질문을 많이 해보세요!',
    type: 'INFORMATION',
    imageUrl: 'https://example.com/images/post1.jpg',
    tags: ['멘토링', '꿀팁', '소통'],
    authorId: 'user-mentor-1234',
    authorName: '김멘토',
    authorType: 'MENTOR',
    createdDate: '2025-08-01T10:30:00Z',
    updatedDate: '2025-08-01T12:00:00Z',
  },
  {
    id: 'a7e2f4b9-9876-4e56-bcde-222222222222',
    title: '학과 선택 고민이 있어요',
    content: '컴공이랑 전전 중에 고민 중인데, 현실적인 조언 부탁드려요.',
    type: 'QUESTION',
    imageUrl: null,
    tags: ['진로', '학과선택', '고민'],
    authorId: 'user-mentee-5678',
    authorName: '이멘티',
    authorType: 'MENTEE',
    createdDate: '2025-08-02T08:45:00Z',
    updatedDate: null,
  },
];
const PostCardList = () => {
  const data = dummyPosts;
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <PostCard data={item} />}
      keyExtractor={item => item.id}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default PostCardList;
