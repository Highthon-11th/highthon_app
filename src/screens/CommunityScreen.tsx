import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import searchIcon from '../../assets/search.png';
import { Image } from 'react-native';
import CommunityBar from '@/components/community/CommunityBar';
import { useState } from 'react';
import Category from '@/components/community/Category';
import Header from '@/components/Header';

const CommunityScreen = () => {
  const categories = ['사회', '꿀팁', '건강', '돈 관리', '취업'];
  const [searchValue, setSearchValue] = useState<string>('');
  return (
    <SafeAreaView style={styles.container}>
      <Header title="게시판" />
      <ScrollView style={styles.wrapper}>
        <View style={styles.searchWrap}>
          <TouchableOpacity>
            <Image source={searchIcon} style={styles.search} />
          </TouchableOpacity>
          <TextInput
            placeholder="검색"
            style={styles.searchbar}
            value={searchValue}
            onChangeText={setSearchValue}
          />
          <View style={{ height: 12 }} />
        </View>
        <View style={styles.categoryWrap}>
          {categories.map(item => (
            <Category title={`# ${item}`} />
          ))}
        </View>
        <View style={{ height: 12 }} />
        <CommunityBar
          title="면접 후기 공유합니다"
          tag={['면접', '대기업']}
          type="info"
        />
        <CommunityBar
          title="면접 후기 공유합니다"
          tag={['면접', '대기업']}
          role="작성자"
          author="홍길동"
          date="2025-08-02"
          view={123}
          type="question"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
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
