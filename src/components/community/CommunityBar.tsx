import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

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
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'medium',
          }}
        >
          {props.title}
        </Text>
        {props.tag.map(items => (
          <Text># {items}</Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'white',
    borderBottomColor: '#D9D9D9',
    borderBottomWidth: 1,
    height: 76,
  },
  wrapper: {
    paddingVertical: 12,
  },
});

export default CommunityBar;
