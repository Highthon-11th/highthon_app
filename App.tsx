/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { useEffect } from 'react';
import Config from 'react-native-config';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    console.log(Config.PUBLIC_API_URL);
    console.log('jflskdjfkldsjfl');
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {/*<NewAppScreen templateFileName="App.tsx" />*/}
      <Text>jaldkfjlksd</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
