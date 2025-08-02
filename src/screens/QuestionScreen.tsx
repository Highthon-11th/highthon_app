import Header from '@/components/Header';
import Comment from '@/components/question/Comment';
import { COLOR } from '@/styles/color/color';
import { body1, body3 } from '@/styles/typography/body';
import { title1 } from '@/styles/typography/title';
import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery } from '@tanstack/react-query';
import postQuery from '@lib/query/postQuery.ts';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootNavGraph } from '@navigation/navigation/graph';

interface Props extends NativeStackScreenProps<RootNavGraph, 'Question'> {}

const QuestionScreen = ({ navigation, route }: Props) => {
  const [comment, setComment] = useState('');

  const { post } = route.params;

  const handleSendComment = () => {
    if (comment.trim()) {
      // 댓글 전송 로직
      console.log('댓글 전송:', comment);
      setComment('');
    }
  };

  // 날짜 포맷팅 함수
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}월 ${day}일`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="정보" />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          style={styles.wrapper}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.infoWrap}>
            <View
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                flexDirection: 'row',
              }}
            >
              <View style={styles.profile} />
              <Text style={body3}>
                *{post.authorType === 'MENTOR' ? '멘토' : '멘티'}* ·{' '}
                {post.authorName}
              </Text>
            </View>
            <Text style={title1}>{post.title}</Text>
            <View style={{ display: 'flex', flexDirection: 'row', gap: 4 }}>
              {post.tags &&
                post.tags.map((tag: string, index: number) => (
                  <Text key={index} style={[body3, { color: COLOR.main }]}>
                    #{tag}
                  </Text>
                ))}
            </View>
            <Text style={body3}>
              · {formatDate(post.createdDate)} · 조회 20
            </Text>
          </View>
          <View style={styles.contentContainer}>
            {/* 이미지가 있는 경우 표시 */}
            {post.imageUrl && (
              <Image
                source={{ uri: post.imageUrl }}
                style={{
                  width: '100%',
                  backgroundColor: COLOR.stroke,
                  height: 182,
                  borderRadius: 8,
                }}
              />
            )}
            <Text style={body1}>{post.content}</Text>
          </View>
          <View>
            <Text
              style={[
                title1,
                {
                  borderColor: COLOR.stroke,
                  borderBottomWidth: 1,
                  paddingHorizontal: 20,
                  paddingVertical: 12,
                },
              ]}
            >
              댓글
            </Text>
          </View>
          <View style={styles.commentsContainer}>
            <Comment />
            <Comment />
          </View>
        </ScrollView>

        <View style={styles.commentInputContainer}>
          <TextInput
            style={styles.commentInput}
            placeholder="댓글을 입력 해주세요"
            placeholderTextColor={COLOR.stroke}
            value={comment}
            onChangeText={setComment}
            multiline={true}
            maxLength={500}
          />
          <TouchableOpacity
            style={styles.sendButton}
            onPress={handleSendComment}
            disabled={!comment.trim()}
          >
            <Text style={styles.sendButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  wrapper: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 80,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  profile: {
    width: 36,
    height: 36,
    backgroundColor: COLOR.stroke,
    borderRadius: 2400,
  },
  infoWrap: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  contentContainer: {
    width: '100%',
    borderBlockColor: COLOR.stroke,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    padding: 20,
    display: 'flex',
    gap: 20,
  },
  commentsContainer: {
    paddingBottom: 20,
  },
  commentInputContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: COLOR.stroke,
    gap: 12,
  },
  commentInput: {
    flex: 1,
    backgroundColor: COLOR.stroke,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    maxHeight: 100,
    fontSize: 12,
    lineHeight: 20,
  },
  sendButton: {
    width: 40,
    height: 40,
    backgroundColor: COLOR.stroke,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLOR.black,
  },
});

export default QuestionScreen;
