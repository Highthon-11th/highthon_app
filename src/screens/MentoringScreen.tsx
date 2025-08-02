import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import Header from '../components/Header';
import MentorList from '../components/MentorList';

// 더미 데이터
const mentorData = [
  {
    id: 1,
    name: "김민수 멘토",
    time: "오후 2:33",
    description: "프론트엔드 개발 전문가입니다",
    image: null
  },
  {
    id: 2,
    name: "이지은 멘토", 
    time: "오후 1:15",
    description: "UI/UX 디자인과 사용자 경험 설계",
    image: null
  },
  {
    id: 3,
    name: "박준호 멘토",
    time: "오전 11:20", 
    description: "백엔드 개발 및 데이터베이스 설계",
    image: null
  }
];

const HomeScreen = () => {
  return (
    <SafeAreaView>
      <Header title="멘토" />
      <View style={styles.container}>
        <MentorList mentors={mentorData} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  }
});

export default HomeScreen;