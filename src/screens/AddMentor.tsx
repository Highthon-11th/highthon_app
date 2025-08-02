import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
} from 'react-native';
import Header from '../components/Header';
import SearchIcon from '../../assets/search.png';
import MentorList from '../components/MentorList';
import { useQuery } from '@tanstack/react-query';
import { defaultClient } from '@/lib/client';

export interface Mentor {
  id: string;
  email: string;
  name: string;
  role: string;
  profileImageUrl: string;
  createdDate: string;
  updatedDate: string;
  introduce: string;
  description: string;
}

const fetchMentorList = async (): Promise<Mentor[]> => {
  const res = await defaultClient(`/mentor/list`);
  return res.data;
};

const HomeScreen = () => {
  const [searchText, setSearchText] = useState('');
  const {
    data: mentorData = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['mentor'],
    queryFn: fetchMentorList,
    retry: Infinity,
    retryDelay: 3000,
    refetchOnMount: true,
    staleTime: 0,
  });

  const filteredMentors = mentorData.filter(mentor =>
    mentor.name.toLowerCase().includes(searchText.toLowerCase()),
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

        {isLoading && <Text>로딩 중...</Text>}
        {isError && <Text>에러가 발생했습니다.</Text>}
        {!isLoading && !isError && <MentorList mentors={filteredMentors} />}
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
