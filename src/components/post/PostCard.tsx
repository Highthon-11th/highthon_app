import { COLOR } from '@/styles/color/color';
import { body1, body3 } from '@/styles/typography/body';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Post } from '@lib/types/Post.ts';

type Props = {
  data: Post;
  onPress: () => void;
};

const formater = new Intl.DateTimeFormat('ko', {
  month: '2-digit',
  day: '2-digit',
  timeZone: 'Asia/Seoul',
});

const PostCard = ({ data, onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text
            style={[
              body3,
              {
                color:
                  data.type === 'QUESTION' ? COLOR.background2 : COLOR.main,
                backgroundColor:
                  data.type !== 'QUESTION' ? COLOR.stroke : COLOR.main,
                paddingVertical: 4,
                paddingHorizontal: 10,
                borderRadius: 8,
              },
            ]}
          >
            {data.type === 'INFORMATION' ? '정보' : '질문'}
          </Text>
          <Text style={[body1, { color: COLOR.black }]}>{data.title}</Text>
        </View>
        <View style={{ height: 6 }} />
        <View style={styles.tagList}>
          {data.tags.map(tag => (
            <Text style={[body3, { color: COLOR.main }]}># {tag}</Text>
          ))}
        </View>
        <View style={{ height: 10 }} />
        <Text style={[body3]}>
          {`*${data.authorType === 'MENTEE' ? '멘티' : '멘토'}* ·  ${
            data.authorName
          } · ${formater.format(new Date(data.createdDate))} · 조회 ${3}`}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'white',
    paddingVertical: 14,
    paddingHorizontal: 20,
    boxShadow: `inset 0px -0.5px 0px ${COLOR.stroke}`,
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  tagList: {
    display: 'flex',
    flexDirection: 'row',
    gap: 4,
  },
});

export default PostCard;
