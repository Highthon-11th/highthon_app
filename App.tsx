import React, { useEffect } from 'react';
import { RootNavigation } from '@navigation/navigation';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LogBox } from 'react-native';

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    LogBox.ignoreAllLogs();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <RootNavigation />
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;
