import React, { Suspense, useEffect } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import Header from '../components/Header';
import firestore from '@react-native-firebase/firestore';
import MentoringList from '@components/mentoring/MentoringList.tsx';

const MentoringScreen = () => {
  return (
    <SafeAreaView>
      <Header title="멘토" />
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
