import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Image } from 'react-native';
import PlusIcon from '../../assets/plusIcon.png';
import ArrowIcon from '../../assets/arrow_back_ios.png';
import { title1 } from '../styles/typography/title';

interface Props {
  title: string;
}

const Header = ({ title }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.Wrapper}>
        <View style={styles.arrowBox}>
          <Image source={ArrowIcon} style={styles.arrowIcon} />
          <Text style={title1}>{title}</Text>
        </View>

        <Image source={PlusIcon} style={styles.plusIcon} />
      </View>
      <View style={styles.hr}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column', // 세로 배치로 변경
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 50,
  },
  Wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 362,
    height: 30,
  },
  arrowBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // width: 74,
    height: 24,
  },
  arrowIcon: {
    width: 9,
    height: 16,
    marginRight: 10,
  },
  plusIcon: {
    width: 20,
    height: 20,
  },
  hr: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#D9D9D9',
    marginTop: 10,
  },
});

export default Header;
