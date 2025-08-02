import React from 'react';
import { Message } from '@lib/types/Message.ts';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getMe } from '@lib/api/auth.ts';
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

  if (data.senderId === user.id) {
    return <Me message={data.message} />;
  } else {
    return <Mentor message={data.message} name={'djk'} />;
  }
};

export default ChatBox;
