import { COLOR } from '@/styles/color/color';
import { body1, body3 } from '@/styles/typography/body';
import { Comment as CommentType } from '@/lib/types/Comment';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getUser } from '@lib/api/auth.ts';

interface CommentProps {
  data: CommentType;
}

const formater = new Intl.DateTimeFormat('ko', {
  hour: '2-digit',
  minute: '2-digit',
  timeZone: 'Asia/Seoul',
});

const Comment = ({ data }: CommentProps) => {
  const { data: author } = useSuspenseQuery({
    queryKey: ['user', data.authorId],
    queryFn: () => getUser(data.authorId),
  });
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.profile} />
        <View style={{ display: 'flex', flexDirection: 'column' }}>
          <Text style={[body3, styles.name]}>
            *{author.role === 'MENTOR' ? '멘토' : '멘티'}* · {author.name}
          </Text>
          <Text style={body3}>
            {' '}
            · {formater.format(new Date(data.createdDate))}
          </Text>
        </View>
      </View>
      <View style={{ height: 8 }} />
      <Text style={body1}>{data.content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomColor: COLOR.stroke,
    borderBottomWidth: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profile: {
    width: 36,
    height: 36,
    backgroundColor: COLOR.stroke,
    borderRadius: 2400,
  },
  name: {
    marginLeft: 8,
  },
});

export default Comment;
