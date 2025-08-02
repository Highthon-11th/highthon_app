import { COLOR } from '@/styles/color/color';
import { body1, body3 } from '@/styles/typography/body';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Comment = () => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.profile} />
        <View style={{ display: 'flex', flexDirection: 'column' }}>
          <Text style={[body3, styles.name]}>*멘토* · 작성자</Text>
          <Text style={body3}> · 08:02</Text>
        </View>
      </View>
      <View style={{ height: 8 }} />
      <Text style={body1}>내용</Text>
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
