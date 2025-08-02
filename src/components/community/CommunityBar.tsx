import { COLOR } from '@/styles/color/color';
import { body1, body3 } from '@/styles/typography/body';
import { title1, title3 } from '@/styles/typography/title';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type BarProps = {
  title: string;
  tag: string[];
  role: string;
  author: string;
  date: string;
  view: number;
};

const CommunityBar = (props: BarProps) => {
  return (
    <TouchableOpacity>
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <Text style={title3}>{props.title}</Text>
          <View style={{ display: 'flex', flexDirection: 'row', gap: 4 }}>
            {props.tag.map(items => (
              <Text style={[body1, { color: COLOR.main }]}># {items}</Text>
            ))}
          </View>
          <View style={{ height: 8 }} />
          <Text
            style={body3}
          >{`*${props.role}* ·  ${props.author} · ${props.date} · 조회 ${props.view}`}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'white',
    borderBottomColor: '#D9D9D9',
    borderBottomWidth: 1,
  },
  wrapper: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
});

export default CommunityBar;
