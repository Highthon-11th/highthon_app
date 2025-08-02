import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image } from 'react-native';
import Header from '../components/Header';
import { body3, body2 } from '../styles/typography/body';
import { title3 } from '../styles/typography/title';

// 더미 데이터
const mentorData = [
  {
    id: 1,
    name: "김민수 멘토",
    time: "오후 2:33",
    description: "프론트엔드 개발 전문가입니다",
    image: null // 이미지 URL이 있으면 여기에
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
        <View style={styles.wrapper}>
          {mentorData.map((mentor) => (
            <View key={mentor.id} style={styles.card}>
              <View style={styles.imageBox}>
                {mentor.image ? (
                  <Image source={{ uri: mentor.image }} style={styles.profileImage} />
                ) : (
                  <View style={styles.placeholderImage} />
                )}
              </View>
              <View style={styles.cardContent}>
                <View style={styles.cardTopBox}>
                  <Text style={title3}>{mentor.name}</Text>
                  <Text style={[body3, {color:'#747474'}]}>{mentor.time}</Text>
                </View>
                <View style={styles.cardBottomBox}>
                  <Text style={[body2, {color:'#747474'}]}>{mentor.description}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
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
  },
  wrapper: {
    width: 362,
    height: '100%',
    marginTop: 20,
  },
  card: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: 76,
    borderBottomWidth: 1,
    borderBottomColor: '#D9D9D9',
    marginBottom: 10, // 카드 간격 추가
  },
  imageBox: {
    width: 55,
    height: 55,
    borderRadius: 8,
    backgroundColor: '#D9D9D9',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#D9D9D9',
    borderRadius: 8,
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    width: 286,
    height: 42,
  },
  cardTopBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 21,
    width: 286,
  },
  cardBottomBox: {
    display: 'flex',
    height: 17,
    width: 286,
  }
});

export default HomeScreen;