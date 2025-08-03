import React from 'react';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { authClient } from '@/lib/client';
import { User } from '@lib/types/User.ts';
import { FlatList, RefreshControl } from 'react-native';
import MentoringCard from '@components/mentoring/MentoringCard.tsx';

const mentoringQuery = queryOptions({
  queryKey: ['mentoring', 'list'],
  queryFn: async () => {
    const { data } = await authClient.get<User[]>('/mentoring/list');

    return data;
  },
});

const chatRoomQuery = queryOptions({
  queryKey: ['mentoring', 'chat', 'list'],
  queryFn: async () => {
    const { data } = await authClient.get<string[]>('/mentoring/chat/list');

    return data;
  },
});

const MentoringList = () => {
  const { data, refetch } = useSuspenseQuery(mentoringQuery);
  const { data: chatRoomList } = useSuspenseQuery(chatRoomQuery);

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
      renderItem={({ item, index }) => (
        <MentoringCard data={item} chatRoomId={chatRoomList[index]} />
      )}
    />
  );
};

export default MentoringList;
