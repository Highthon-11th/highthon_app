import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import { useNavigation } from '@react-navigation/native';
import {
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { defaultClient } from '@/lib/client';
import postQuery from '@lib/query/postQuery.ts';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  content: string;
  type: string;
  createdDate: string;
  updatedDate: string;
  imageURL?: string;
  tags: string[];
  authorId: string;
  authorName: string;
  authorType: string;
}

const fetchMentorList = async (): Promise<Mentor[]> => {
  const res = await defaultClient(`/mentor/list`);
  return res.data;
};

const MentorMenteeScreen = () => {
  const {
    data: mentorData = [],
    isLoading: mentorLoading,
    isError: mentorError,
  } = useQuery({
    queryKey: ['mentor'],
    queryFn: fetchMentorList,
    retry: Infinity,
    retryDelay: 3000,
    refetchOnMount: true,
    staleTime: 0,
  });

  const {
    data: postsData = [],
    isLoading: postsLoading,
    isError: postsError,
  } = useQuery({
    ...postQuery.list([]), // 모든 게시글 가져오기
  });

  const navigation = useNavigation();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

  // 태그 필터링
  useEffect(() => {
    if (selectedTags.length === 0) {
      setFilteredPosts(postsData);
    } else {
      const filtered = postsData.filter(post =>
        selectedTags.some(selectedTag =>
          post.tags.some(postTag =>
            postTag.includes(selectedTag.replace('#', '')),
          ),
        ),
      );
      setFilteredPosts(filtered);
    }
  }, [selectedTags, postsData]);

  const handleTagPress = (tag: string) => {
    setSelectedTags(prev => {
      if (prev.includes(tag)) {
        return prev.filter(t => t !== tag);
      } else {
        return [...prev, tag];
      }
    });
  };

  const clearAllFilters = () => {
    setSelectedTags([]);
  };

  const handleMentorPress = (mentorId: string) => {
    console.log('멘토 선택:', mentorId);
  };

  // 게시글 클릭 핸들러
  const handlePostPress = async (postId: string) => {
    try {
      await AsyncStorage.setItem('communityId', postId);
      navigation.navigate('Question' as never);
    } catch (error) {
      console.error('에러 발생:', error);
    }
  };

  const handleMentorManagerPress = () => {
    navigation.navigate('Mentoring' as never);
  };

  const handleMorePress = () => {
    navigation.navigate('Community' as never);
  };

  // 날짜 포맷팅 함수
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}월 ${day}일`;
  };

  const MentorCard = ({ mentor }: { mentor: Mentor }) => (
    <TouchableOpacity
      style={[
        styles.mentorCard,
        mentor.isRecommended && styles.recommendedCard,
      ]}
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
    <TouchableOpacity
      style={styles.postCard}
      onPress={() => handlePostPress(post.id)}
    >
      <View style={styles.categoryBadge}>
        <Text style={styles.categoryText}>
          {post.type === 'INFORMATION' ? '정보' : '질문'}
        </Text>
      </View>
      <Text style={styles.postTitle}>{post.title}</Text>
      <View style={styles.tagContainer}>
        {post.tags.map((tag, i) => (
          <Text
            key={i}
            style={[
              styles.postTag,
              selectedTags.some(selectedTag =>
                tag.includes(selectedTag.replace('#', '')),
              ) && styles.highlightedTag,
            ]}
          >
            #{tag}
          </Text>
        ))}
      </View>
      <View style={styles.postFooter}>
        <Text style={styles.postMeta}>
          *{post.authorName} · 작성자 · {formatDate(post.createdDate)} · 조회 20
        </Text>
      </View>
    </TouchableOpacity>
  );

  const tags = ['#사회', '#꿀팁', '#건강', '#돈 관리', '#취업'];

  // 표시할 게시글을 최대 2개로 제한
  const displayedPosts = filteredPosts.slice(0, 2);

  return (
    <SafeAreaView style={styles.container}>
      <Header title="홈" />
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* 추천 멘토 섹션 */}
        <Text style={styles.sectionTitle}>추천 멘토</Text>
        {mentorLoading ? (
          <ActivityIndicator size="small" color="#6C5CE7" />
        ) : (
          mentorData.map(mentor => (
            <MentorCard key={mentor.id} mentor={mentor} />
          ))
        )}

        <TouchableOpacity
          style={styles.button}
          onPress={handleMentorManagerPress}
        >
          <Text style={styles.buttonText}>멘토 매니저 가기</Text>
        </TouchableOpacity>

        {/* 커뮤니티 섹션 */}
        <View style={styles.communityHeader}>
          <Text style={styles.sectionTitle}>커뮤니티</Text>
          {selectedTags.length > 0 && (
            <TouchableOpacity
              onPress={clearAllFilters}
              style={styles.clearButton}
            >
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
                selectedTags.includes(tag) && styles.selectedTagButton,
              ]}
            >
              <Text
                style={[
                  styles.tagButtonText,
                  selectedTags.includes(tag) && styles.selectedTagText,
                ]}
              >
                {tag}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* 필터링된 게시글 표시 */}
        {selectedTags.length > 0 && (
          <Text style={styles.filterInfo}>
            {selectedTags.join(', ')} 태그로 필터링된 게시글 (
            {filteredPosts.length}개 중 {Math.min(filteredPosts.length, 2)}개
            표시)
          </Text>
        )}

        {/* 게시글 표시 */}
        {postsLoading ? (
          <ActivityIndicator size="small" color="#6C5CE7" />
        ) : displayedPosts.length > 0 ? (
          displayedPosts.map(post => <PostCard key={post.id} post={post} />)
        ) : (
          <View style={styles.noResultsContainer}>
            <Text style={styles.noResultsText}>
              {selectedTags.length > 0
                ? '선택한 태그에 해당하는 게시글이 없습니다.'
                : '게시글이 없습니다.'}
            </Text>
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
