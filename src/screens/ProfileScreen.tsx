import Header from '@/components/Header';
import { COLOR } from '@/styles/color/color';
import { body1, body2, body3 } from '@/styles/typography/body';
import { title2 } from '@/styles/typography/title';
import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getMe } from '@lib/api/auth.ts';
import { useSuspenseQuery } from '@tanstack/react-query';
import { authClient } from '@lib/client';
import { Post } from '@lib/types/Post.ts';
import PostCard from '@components/post/PostCard.tsx';

const ProfileScreen = () => {
  const [activeTab, setActiveTab] = useState('posts');

  const { data } = useSuspenseQuery({
    queryKey: ['post', 'list', 'my'],
    queryFn: async () => {
      const res = await authClient.get<Post[]>('/post/my');

      return res.data;
    },
  });

  const { data: user } = useSuspenseQuery({
    queryKey: ['user', 'me'],
    queryFn: getMe,
  });

  // const PostItem = ({ item }: { item: any }) => (
  //   <TouchableOpacity style={styles.postItem}>
  //     <View style={styles.postHeader}>
  //       <View
  //         style={[
  //           styles.categoryBadge,
  //           { backgroundColor: item.categoryColor },
  //         ]}
  //       >
  //         <Text
  //           style={[
  //             body3,
  //             {
  //               color: item.categoryColor === COLOR.main ? '#fff' : COLOR.black,
  //             },
  //           ]}
  //         >
  //           {item.category}
  //         </Text>
  //       </View>
  //       <TouchableOpacity style={styles.moreButton}>
  //         <Text style={styles.moreButtonText}>⋮</Text>
  //       </TouchableOpacity>
  //     </View>
  //     <Text style={[body1, styles.postTitle]}>{item.title}</Text>
  //     <View style={styles.tagsContainer}>
  //       {(item.tags || []).map((tag: any, index: any) => (
  //         <Text key={index} style={[body3, { color: COLOR.main }]}>
  //           #{tag}
  //         </Text>
  //       ))}
  //     </View>
  //     <Text style={[body3, { color: COLOR.black }]}>
  //       {item.author} · {item.role} · {item.date} 조회 {item.views}
  //     </Text>
  //   </TouchableOpacity>
  // );

  console.log(user.profileImageUrl);

  return (
    <SafeAreaView style={styles.container}>
      <Header title="마이페이지" />

      <View style={styles.profileSection}>
        <Image
          style={styles.profileImage}
          source={{
            uri: user.profileImageUrl || 'https://via.placeholder.com/80',
          }}
        />
        <View style={styles.profileInfo}>
          <View style={styles.userNameContainer}>
            <View style={styles.mentorBadge}>
              <Text style={[body3, { color: '#fff' }]}>
                {user.role === 'MENTOR' ? '멘토' : '멘티'}
              </Text>
            </View>
            <Text style={title2}>{user.name}</Text>
          </View>
          <Text style={[body2, { color: COLOR.black }]}>{user.email}</Text>
        </View>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'posts' && styles.activeTabButton,
          ]}
          onPress={() => setActiveTab('posts')}
        >
          <Text
            style={[
              body1,
              { color: activeTab === 'posts' ? '#fff' : COLOR.black },
            ]}
          >
            작성한 글
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'comments' && styles.activeTabButton,
          ]}
          onPress={() => setActiveTab('comments')}
        >
          <Text
            style={[
              body1,
              { color: activeTab === 'comments' ? '#fff' : COLOR.black },
            ]}
          >
            작성한 댓글
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.contentContainer}>
        {activeTab === 'posts' ? (
          data.length > 0 ? (
            data.map(item => <PostCard key={item.id} data={item} />)
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={[body2, { color: COLOR.black }]}>
                작성한 댓글이 없습니다.
              </Text>
            </View>
          )
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={[body2, { color: COLOR.black }]}>
              작성한 게시글이 없습니다.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profileSection: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: 'center',
    gap: 16,
  },
  profileImage: {
    width: 80,
    height: 80,
    backgroundColor: COLOR.stroke,
    borderRadius: 40,
  },
  profileInfo: {
    flex: 1,
    gap: 8,
  },
  userNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  mentorBadge: {
    backgroundColor: '#D4A574',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 20,
  },
  tabButton: {
    flex: 1,
    backgroundColor: COLOR.stroke,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  activeTabButton: {
    backgroundColor: COLOR.main,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  postItem: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLOR.stroke,
    gap: 8,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  moreButton: {
    padding: 4,
  },
  moreButtonText: {
    fontSize: 16,
    color: COLOR.black,
  },
  postTitle: {
    fontWeight: '600',
    lineHeight: 24,
  },
  tagsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
});

export default ProfileScreen;
