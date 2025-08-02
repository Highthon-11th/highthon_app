import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootNavGraph } from '@navigation/navigation/graph';
import HomeScreen from '@screens/HomeScreen.tsx';
import CommunityScreen from '@screens/CommunityScreen.tsx';
import ProfileScreen from '@screens/ProfileScreen.tsx';
import MentoringScreen from '@screens/MentoringScreen.tsx';
import UploadPostScreen from '@/screens/UploadPostScreen';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootNavGraph {}
  }
}

const Stack = createNativeStackNavigator<RootNavGraph>();

const RootNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName={'Profile'}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={'Home'} component={HomeScreen} />
      <Stack.Screen name={'Community'} component={CommunityScreen} />
      <Stack.Screen name={'Profile'} component={ProfileScreen} />
      <Stack.Screen name={'Mentoring'} component={MentoringScreen} />
      <Stack.Screen name={'UploadPostScreen'} component={UploadPostScreen} />
    </Stack.Navigator>
  );
};

export default RootNavigation;
