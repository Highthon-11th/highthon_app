import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PlusIcon from '../../assets/plusIcon.png';
import ArrowIcon from '../../assets/arrow_back_ios.png';
import settingIcon from '../../assets/settings.png';
import { title1 } from '../styles/typography/title';
import { login as kakaoLogin } from '@react-native-seoul/kakao-login';
import { login } from '@lib/api/auth.ts';

interface Props {
  title: string;
}

const Header = ({ title }: Props) => {
  const navigation = useNavigation();
  
  // 디버깅용 - title 값 확인
  console.log('Header title:', title);

  const handlePlusPress = () => {
    if (title === '게시판') {
      navigation.navigate('UploadPostScreen' as never);
    } else {
      navigation.navigate('AddMentor' as never);
    }
  };

  const handleSettingPress = () => {
    navigation.navigate('Settings' as never);
  };

  const handleBackPress = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  // 우측 아이콘 렌더링 함수
  const renderRightIcon = () => {
    if (title === '글작성' || title === '정보' || title === '멘토 추가') {
      return null; // 아이콘 없음
    }
    
    if (title === 'my page') {
      return (
        <TouchableOpacity
          onPress={handleSettingPress}
          activeOpacity={0.7}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          style={styles.touchableArea}
        >
          <Image source={settingIcon} style={styles.settingIcon} />
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity
        onPress={handlePlusPress}
        activeOpacity={0.7}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        style={styles.touchableArea}
      >
        <Image source={PlusIcon} style={styles.plusIcon} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.Wrapper}>
        <View style={styles.arrowBox}>
          {/* 뒤로가기 아이콘은 항상 표시 */}
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
         {title !== '멘토 추가' &&  <Image source={PlusIcon} style={styles.plusIcon} />}
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
  settingIcon: {
    width: 20,
    height: 20,
  },
  touchableArea: {
    padding: 5,
    borderRadius: 15,
  },
  hr: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#D9D9D9',
    marginTop: 10,
  },
});

export default Header;
