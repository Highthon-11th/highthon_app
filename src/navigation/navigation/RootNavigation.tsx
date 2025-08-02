import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootNavGraph } from '@navigation/navigation/graph';
import HomeScreen from '@screens/HomeScreen.tsx';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootNavGraph {}
  }
}

const Stack = createNativeStackNavigator<RootNavGraph>();

const RootNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName={'Home'}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={'Home'} component={HomeScreen} />
      <Stack.Screen name={'Community'} component={HomeScreen} />
      <Stack.Screen name={'Profile'} component={HomeScreen} />
      <Stack.Screen name={'Mentoring'} component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default RootNavigation;
