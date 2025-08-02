import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface Mentor {
  id: string;
  name: string;
  description: string;
  isRecommended?: boolean;
}

interface Post {
  id: string;
  title: string;
  author: string;
  date: string;
  views: number;
  tags: string[];
}

const MentorMenteeScreen = () => {
  const navigation = useNavigation();
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [allPosts, setAllPosts] = useState<Post[]>([]); // 전체 게시글 저장
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    // API 호출 부분 - 실제 서버 연동 시 여기서 fetch 사용
    fetchMentors();
    fetchPosts();
  }, []);

  // 선택된 태그가 변경될 때마다 게시글 필터링
  useEffect(() => {
    filterPosts();
  }, [selectedTags, allPosts]);

  const fetchMentors = async () => {
    try {
      // const response = await fetch('YOUR_API_ENDPOINT/mentors');
      // const data = await response.json();
      // setMentors(data);
      
      // 임시 데이터
      setMentors([
        { id: '1', name: '누구 멘토', description: '멘토 소개말', isRecommended: true },
        { id: '2', name: '누구 멘토', description: '멘토 소개말' },
      ]);
    } catch (error) {
      console.error('멘토 데이터 로딩 실패:', error);
    }
  };

  const fetchPosts = async () => {
    try {
      // const response = await fetch('YOUR_API_ENDPOINT/posts');
      // const data = await response.json();
      // setAllPosts(data);
      // setPosts(data);
      
      // 임시 데이터 - 다양한 태그로 구성
      const mockPosts = [
        { id: '1', title: '면접 합격 하려면 어떻게 해야 되나요?', author: '멘티', date: '12월 10일', views: 20, tags: ['#꿀팁', '#취업'] },
        { id: '2', title: '건강한 생활습관 만들기', author: '멘티', date: '12월 9일', views: 15, tags: ['#건강', '#꿀팁'] },
        { id: '3', title: '사회초년생 돈 관리 팁', author: '멘토', date: '12월 8일', views: 30, tags: ['#돈 관리', '#사회'] },
        { id: '4', title: '취업 준비 로드맵', author: '멘토', date: '12월 7일', views: 25, tags: ['#취업', '#사회'] },
        { id: '5', title: '스트레스 관리하는 법', author: '멘티', date: '12월 6일', views: 18, tags: ['#건강'] },
      ];
      
      setAllPosts(mockPosts);
      setPosts(mockPosts);
    } catch (error) {
      console.error('게시글 데이터 로딩 실패:', error);
    }
  };

  const filterPosts = () => {
    if (selectedTags.length === 0) {
      // 선택된 태그가 없으면 모든 게시글 표시
      setPosts(allPosts);
    } else {
      // 선택된 태그와 일치하는 게시글만 필터링
      const filteredPosts = allPosts.filter(post => 
        selectedTags.some(selectedTag => 
          post.tags.includes(selectedTag)
        )
      );
      setPosts(filteredPosts);
    }
  };

  const handleTagPress = (tag: string) => {
    setSelectedTags(prev => {
      if (prev.includes(tag)) {
        // 이미 선택된 태그라면 제거
        return prev.filter(t => t !== tag);
      } else {
        // 새로운 태그라면 추가
        return [...prev, tag];
      }
    });
  };

  const clearAllFilters = () => {
    setSelectedTags([]);
  };

  const handleMentorPress = (mentorId: string) => {
    // 멘토 상세 화면으로 네비게이션
    // navigation.navigate('MentorDetail', { mentorId });
    console.log('멘토 선택:', mentorId);
  };

  const handlePostPress = (postId: string) => {
    // 게시글 상세 화면으로 네비게이션
    // navigation.navigate('PostDetail', { postId });
    console.log('게시글 선택:', postId);
  };

  // 멘토 매니저 가기 버튼 핸들러
  const handleMentorManagerPress = () => {
    navigation.navigate('Mentoring' as never);
  };

  // 더보기 버튼 핸들러
  const handleMorePress = () => {
    navigation.navigate('Community' as never);
  };

  const MentorCard = ({ mentor }: { mentor: Mentor }) => (
    <TouchableOpacity 
      style={[styles.mentorCard, mentor.isRecommended && styles.recommendedCard]}
      onPress={() => handleMentorPress(mentor.id)}
    >
      <View style={styles.profileImage} />
      {mentor.isRecommended && (
        <View style={styles.recommendedBadge}>
          <Text style={styles.badgeText}>추천</Text>
        </View>
      )}
      <View style={styles.mentorInfo}>
        <Text style={styles.mentorName}>{mentor.name}</Text>
        <Text style={styles.mentorDescription}>{mentor.description}</Text>
      </View>
    </TouchableOpacity>
  );

  const PostCard = ({ post }: { post: Post }) => (
    <TouchableOpacity style={styles.postCard} onPress={() => handlePostPress(post.id)}>
      <View style={styles.categoryBadge}>
        <Text style={styles.categoryText}>질문</Text>
      </View>
      <Text style={styles.postTitle}>{post.title}</Text>
      <View style={styles.tagContainer}>
        {post.tags.map((tag, i) => (
          <Text 
            key={i} 
            style={[
              styles.postTag,
              selectedTags.includes(tag) && styles.highlightedTag
            ]}
          >
            {tag}
          </Text>
        ))}
      </View>
      <View style={styles.postFooter}>
        <Text style={styles.postMeta}>
          *{post.author} · 작성자 · {post.date} · 조회 {post.views}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const tags = ['#사회', '#꿀팁', '#건강', '#돈 관리', '#취업'];

  // 표시할 게시글을 최대 2개로 제한
  const displayedPosts = posts.slice(0, 2);

  return (
    <SafeAreaView style={styles.container}>
      <Header title='홈' />
      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        
        {/* 추천 멘토 섹션 */}
        <Text style={styles.sectionTitle}>추천 멘토</Text>
        {mentors.map(mentor => <MentorCard key={mentor.id} mentor={mentor} />)}
        
        <TouchableOpacity style={styles.button} onPress={handleMentorManagerPress}>
          <Text style={styles.buttonText}>멘토 매니저 가기</Text>
        </TouchableOpacity>

        {/* 커뮤니티 섹션 */}
        <View style={styles.communityHeader}>
          <Text style={styles.sectionTitle}>커뮤니티</Text>
          {selectedTags.length > 0 && (
            <TouchableOpacity onPress={clearAllFilters} style={styles.clearButton}>
              <Text style={styles.clearButtonText}>전체보기</Text>
            </TouchableOpacity>
          )}
        </View>
        
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.tagScrollContainer}
          contentContainerStyle={styles.tagScrollContent}
        >
          {tags.map((tag, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => handleTagPress(tag)}
              style={[
                styles.tagButton,
                selectedTags.includes(tag) && styles.selectedTagButton
              ]}
            >
              <Text style={[
                styles.tagButtonText,
                selectedTags.includes(tag) && styles.selectedTagText
              ]}>
                {tag}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* 필터링된 게시글 표시 */}
        {selectedTags.length > 0 && (
          <Text style={styles.filterInfo}>
            {selectedTags.join(', ')} 태그로 필터링된 게시글 ({posts.length}개 중 {Math.min(posts.length, 2)}개 표시)
          </Text>
        )}

        {/* 최대 2개의 게시글만 표시 */}
        {displayedPosts.length > 0 ? (
          displayedPosts.map(post => <PostCard key={post.id} post={post} />)
        ) : (
          <View style={styles.noResultsContainer}>
            <Text style={styles.noResultsText}>선택한 태그에 해당하는 게시글이 없습니다.</Text>
          </View>
        )}
        
        <TouchableOpacity style={styles.button} onPress={handleMorePress}>
          <Text style={styles.buttonText}>더보기</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: screenWidth * 0.045,
    paddingBottom: screenHeight * 0.035,
  },
  sectionTitle: {
    fontSize: screenWidth * 0.048,
    fontWeight: 'bold',
    marginTop: screenHeight * 0.02,
    marginBottom: screenHeight * 0.015,
    color: '#000000',
  },
  communityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: screenHeight * 0.02,
  },
  clearButton: {
    backgroundColor: '#F0F0F0',
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  clearButtonText: {
    fontSize: screenWidth * 0.03,
    color: '#666666',
  },
  filterInfo: {
    fontSize: screenWidth * 0.03,
    color: '#6C5CE7',
    marginBottom: screenHeight * 0.01,
    fontWeight: '500',
  },
  noResultsContainer: {
    alignItems: 'center',
    paddingVertical: screenHeight * 0.04,
  },
  noResultsText: {
    fontSize: screenWidth * 0.035,
    color: '#999999',
    textAlign: 'center',
  },
  highlightedTag: {
    backgroundColor: '#6C5CE7',
    color: '#FFFFFF',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    overflow: 'hidden',
  },
  mentorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: screenWidth * 0.035,
    marginBottom: screenHeight * 0.01,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    position: 'relative',
    minHeight: screenHeight * 0.08,
  },
  recommendedCard: {
    borderWidth: 2,
    borderColor: '#6C5CE7',
    borderStyle: 'dashed',
  },
  profileImage: {
    width: screenWidth * 0.11,
    height: screenWidth * 0.11,
    borderRadius: screenWidth * 0.055,
    backgroundColor: '#E5E5E5',
    marginRight: screenWidth * 0.025,
  },
  recommendedBadge: {
    position: 'absolute',
    top: screenHeight * 0.005,
    left: screenWidth * 0.095,
    backgroundColor: '#FF69B4',
    borderRadius: 8,
    paddingHorizontal: 5,
    paddingVertical: 1,
  },
  badgeText: {
    fontSize: screenWidth * 0.023,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  mentorInfo: {
    flex: 1,
  },
  mentorName: {
    fontSize: screenWidth * 0.038,
    fontWeight: 'bold',
    marginBottom: 3,
    color: '#000000',
  },
  mentorDescription: {
    fontSize: screenWidth * 0.032,
    color: '#666666',
  },
  button: {
    backgroundColor: '#6C5CE7',
    borderRadius: 12,
    paddingVertical: screenHeight * 0.015,
    alignItems: 'center',
    marginTop: screenHeight * 0.015,
    marginBottom: screenHeight * 0.008,
    marginHorizontal: screenWidth * 0.01,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: screenWidth * 0.038,
    fontWeight: 'bold',
  },
  tagScrollContainer: {
    marginBottom: screenHeight * 0.015,
    height: screenHeight * 0.045,
  },
  tagScrollContent: {
    paddingRight: screenWidth * 0.04,
    alignItems: 'center',
  },
  tagButton: {
    backgroundColor: '#F5F5F5',
    borderRadius: 18,
    paddingHorizontal: screenWidth * 0.035,
    paddingVertical: screenHeight * 0.007,
    marginRight: screenWidth * 0.015,
    justifyContent: 'center',
  },
  selectedTagButton: {
    backgroundColor: '#6C5CE7',
  },
  tagButtonText: {
    fontSize: screenWidth * 0.032,
    color: '#666666',
  },
  selectedTagText: {
    color: '#FFFFFF',
  },
  postCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: screenWidth * 0.035,
    marginBottom: screenHeight * 0.01,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    minHeight: screenHeight * 0.1,
  },
  categoryBadge: {
    backgroundColor: '#6C5CE7',
    borderRadius: 10,
    paddingHorizontal: screenWidth * 0.018,
    paddingVertical: screenHeight * 0.003,
    alignSelf: 'flex-start',
    marginBottom: screenHeight * 0.007,
  },
  categoryText: {
    fontSize: screenWidth * 0.028,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  postTitle: {
    fontSize: screenWidth * 0.038,
    fontWeight: 'bold',
    marginBottom: screenHeight * 0.007,
    color: '#000000',
    lineHeight: screenWidth * 0.05,
  },
  tagContainer: {
    flexDirection: 'row',
    marginBottom: screenHeight * 0.007,
    flexWrap: 'wrap',
  },
  postTag: {
    fontSize: screenWidth * 0.032,
    color: '#6C5CE7',
    marginRight: screenWidth * 0.015,
  },
  postFooter: {
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: screenHeight * 0.007,
  },
  postMeta: {
    fontSize: screenWidth * 0.028,
    color: '#999999',
  },
});

export default MentorMenteeScreen;