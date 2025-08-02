import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PlusIcon from '../../assets/plusIcon.png';
import ArrowIcon from '../../assets/arrow_back_ios.png';
import { title1 } from '../styles/typography/title';

interface Props {
  title: string;
}

const Header = ({ title }: Props) => {
  const navigation = useNavigation();

  const handlePlusPress = () => {
    navigation.navigate('AddMentor' as never);
  };

  const handleBackPress = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.Wrapper}>
        <View style={styles.arrowBox}>
          <TouchableOpacity 
            onPress={handleBackPress}
            activeOpacity={0.7}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            style={styles.backButton}
          >
            <Image source={ArrowIcon} style={styles.arrowIcon} />
          </TouchableOpacity>
          <Text style={title1}>{title}</Text>
        </View>
        
        <TouchableOpacity 
          onPress={handlePlusPress}
          activeOpacity={0.7}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          style={styles.touchableArea}
        >
          <Image source={PlusIcon} style={styles.plusIcon} />
        </TouchableOpacity>
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
  backButton: {
    padding: 5,
    borderRadius: 15,
  },
  plusIcon: {
    width: 20,
    height: 20,
  },
  touchableArea: {
    padding: 5,
    borderRadius: 15,
  },
  touchableArea: {
    padding: 5, // 터치 영역을 넓혀줍니다
    borderRadius: 15, // 둥근 터치 영역
  },
  hr: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#D9D9D9',
    marginTop: 10,
  },
});

export default Header;