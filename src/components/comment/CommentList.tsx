import React, { Suspense } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { useSuspenseQuery } from '@tanstack/react-query';
import { authClient } from '@lib/client';
import { Comment as CommentType } from '@lib/types/Comment.ts';
import { Post } from '@lib/types/Post.ts';
import Comment from '@components/comment/Comment.tsx';

interface Props {
  post: Post;
}

const CommentList = ({ post }: Props) => {
  const { data, refetch } = useSuspenseQuery({
    queryKey: ['post', 'comment', post.id],
    queryFn: async () => {
      const res = await authClient.get<CommentType[]>(
        `/post/${post.id}/comments`,
      );

      return res.data;
    },
  });

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refetch().then(() => setRefreshing(false));
  }, [refetch]);

  return (
    <FlatList
      style={{
        height: '100%',
      }}
      data={data}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      renderItem={({ item }) => (
        <Suspense fallback={null}>
          <Comment data={item} />
        </Suspense>
      )}
    />
  );
};

export default CommentList;
