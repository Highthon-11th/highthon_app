import React, { Suspense } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import Header from '../components/Header';
import MentoringList from '@components/mentoring/MentoringList.tsx';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getMe } from '@lib/api/auth.ts';

const MentoringScreen = () => {
  const { data: user } = useSuspenseQuery({
    queryKey: ['user', 'me'],
    queryFn: getMe,
  });

  return (
    <SafeAreaView>
      <Header title={user.role === 'MENTOR' ? '멘티' : '멘토'} />
      <View style={styles.container}>
        <Suspense fallback={<ActivityIndicator />}>
          <MentoringList />
        </Suspense>
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

export default MentoringScreen;
