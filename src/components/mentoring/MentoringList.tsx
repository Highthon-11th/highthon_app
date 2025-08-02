import React from 'react';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { authClient } from '@/lib/client';
import { User } from '@lib/types/User.ts';
import { FlatList } from 'react-native';
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
  const { data } = useSuspenseQuery(mentoringQuery);
  const { data: chatRoomList } = useSuspenseQuery(chatRoomQuery);
  return (
    <FlatList
      data={data}
      renderItem={({ item, index }) => (
        <MentoringCard data={item} chatRoomId={chatRoomList[index]} />
      )}
    />
  );
};

export default MentoringList;
