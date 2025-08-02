import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import Header from '../components/Header';
import MentorList from '../components/MentorList';
import { useQuery } from '@tanstack/react-query';
import { Mentor } from './AddMentor';
import { defaultClient } from '@/lib/client';

const fetchMentorList = async (): Promise<Mentor[]> => {
  const res = await defaultClient(`/mentor/list`);
  return res.data;
};
const HomeScreen = () => {
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
  },
});

export default HomeScreen;
