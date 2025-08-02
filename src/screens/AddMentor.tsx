import React, { useState } from 'react';
import { 
  SafeAreaView,
  View,  
  TextInput,
  TouchableOpacity,  
  StyleSheet,
  Image
} from 'react-native';
import Header from '../components/Header';
import SearchIcon from '../../assets/search.png';
import MentorList from '../components/MentorList';

// 더미 데이터 (검색 가능한 멘토들)
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
  },
  {
    id: 4,
    name: "최수진 멘토",
    time: "오전 9:45", 
    description: "모바일 앱 개발 전문가",
    image: null
  },
  {
    id: 5,
    name: "김철수 멘토",
    time: "오후 3:20", 
    description: "데이터 사이언스 및 AI 전문가",
    image: null
  }
];

const HomeScreen = () => {
  const [searchText, setSearchText] = useState('');
  
  const filteredMentors = mentorData.filter(mentor =>
    mentor.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <SafeAreaView>
      <Header title="멘토 추가" />
      
      <View style={styles.searchWrap}>
        <TouchableOpacity style={styles.searchIconContainer}>
          <Image source={SearchIcon} style={styles.searchIcon} />
        </TouchableOpacity>
        <TextInput
          placeholder="검색"
          style={styles.searchbar}
          value={searchText}
          onChangeText={setSearchText}
        />
        <View style={{ height: 12 }} />
        
        <MentorList mentors={filteredMentors} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  searchWrap: {
    position: 'relative',
    margin: 16,
  },
  searchbar: {
    padding: 12,
    paddingRight: 40,
    borderColor: '#D9D9D9',
    borderWidth: 1,
    borderRadius: 8,
  },
  searchIconContainer: {
    position: 'absolute',
    top: 10,
    right: 12,
    zIndex: 1,
  },
  searchIcon: {
    width: 20,
    height: 20,
  },
});

export default HomeScreen;