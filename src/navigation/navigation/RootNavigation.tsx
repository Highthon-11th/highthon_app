import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootNavGraph } from '@navigation/navigation/graph';
import HomeScreen from '@screens/HomeScreen.tsx';
import CommunityScreen from '@screens/CommunityScreen.tsx';
import ProfileScreen from '@screens/ProfileScreen.tsx';
import MentoringScreen from '@screens/MentoringScreen.tsx';
import UploadPostScreen from '@/screens/UploadPostScreen';
import QuestionScreen from '@/screens/QuestionScreen';
import ChatScreen from '@/screens/ChatScreen';
import AddMentorScreen from '@/screens/AddMentor';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootNavGraph {}
  }
}

const Stack = createNativeStackNavigator<RootNavGraph>();

const RootNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName={'Mentoring'}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={'Home'} component={HomeScreen} />
      <Stack.Screen name={'Community'} component={CommunityScreen} />
      <Stack.Screen name={'Profile'} component={ProfileScreen} />
      <Stack.Screen name={'Mentoring'} component={MentoringScreen} />
      <Stack.Screen name={'Question'} component={QuestionScreen} />
      <Stack.Screen name={'UploadPostScreen'} component={UploadPostScreen} />
      <Stack.Screen name={'AddMentor'} component={AddMentorScreen} />
      <Stack.Screen name={'Chat'} component={ChatScreen} />
    </Stack.Navigator>
  );
};

export default RootNavigation;
