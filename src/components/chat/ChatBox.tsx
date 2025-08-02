import React from 'react';
import { Message } from '@lib/types/Message.ts';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getMe, getUser } from '@lib/api/auth.ts';
import Mentor from '@components/chat/Mentor.tsx';
import Me from '@components/chat/Me.tsx';

interface Props {
  data: Message;
}

const ChatBox = ({ data }: Props) => {
  const { data: user } = useSuspenseQuery({
    queryKey: ['user', 'me'],
    queryFn: getMe,
  });

  const { data: sender } = useSuspenseQuery({
    queryKey: ['user', data.senderId],
    queryFn: () => getUser(data.senderId),
  });

  if (data.senderId === user.id) {
    return <Me message={data.message} />;
  } else {
    return <Mentor message={data.message} name={sender.name} />;
  }
};

export default ChatBox;
