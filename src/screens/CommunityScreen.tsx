import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import searchIcon from '../../assets/search.png';
import { Suspense, useState } from 'react';
import Header from '@/components/Header';
import PostCardList from '@components/post/PostCardList.tsx';
import TagList from '@components/tag/TagList.tsx';

const CommunityScreen = () => {
  // const [searchValue, setSearchValue] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<number[]>([]);

  return (
    <SafeAreaView style={styles.container}>
      <Header title="게시판" />
      <View style={styles.wrapper}>
        {/*<TouchableOpacity>*/}
        {/*  <Image source={searchIcon} style={styles.search} />*/}
        {/*</TouchableOpacity>*/}
        {/*<TextInput*/}
        {/*  placeholder="검색"*/}
        {/*  style={styles.searchbar}*/}
        {/*  value={searchValue}*/}
        {/*  onChangeText={setSearchValue}*/}
        {/*/>*/}
        <View style={{ height: 12 }} />
        <Suspense fallback={<ActivityIndicator />}>
          <TagList
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
          />
        </Suspense>
      </View>
      <View style={{ height: 10 }} />
      <Suspense fallback={<ActivityIndicator />}>
        <PostCardList selectedTags={selectedTags} />
      </Suspense>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 20,
    display: 'flex',
    flexDirection: 'column',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: 20,
  },
  categoryWrap: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
  },
  search: {
    width: 20,
    height: 20,
    position: 'absolute',
    top: 10,
    right: 12,
  },
  searchbar: {
    padding: 12,
    borderBlockColor: '#D9D9D9',
    borderWidth: 1,
    borderRadius: 8,
  },
  searchWrap: {
    position: 'relative',
  },
});

export default CommunityScreen;
