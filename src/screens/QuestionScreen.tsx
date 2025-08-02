import Header from '@/components/Header';
import Comment from '@/components/question/Comment';
import { COLOR } from '@/styles/color/color';
import { body1, body3 } from '@/styles/typography/body';
import { title1 } from '@/styles/typography/title';
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const QuestionScreen = () => {
  const [comment, setComment] = useState('');

  const handleSendComment = () => {
    if (comment.trim()) {
      // 댓글 전송 로직
      console.log('댓글 전송:', comment);
      setComment('');
    }
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
              <Text style={body3}>*멘토* · 작성자</Text>
            </View>
            <Text style={title1}>
              면접관 눈에 무조건 뜨는 면접 서류작성 꿀팁
            </Text>
            <View style={{ display: 'flex', flexDirection: 'row', gap: 4 }}>
              {['꿀팁', '취업'].map(items => (
                <Text key={items} style={[body3, { color: COLOR.main }]}>
                  #{items}
                </Text>
              ))}
            </View>
            <Text style={body3}> · 12월 10일· 조회 20</Text>
          </View>
          <View style={styles.contentContainer}>
            <View
              style={{
                width: '100%',
                backgroundColor: COLOR.stroke,
                height: 182,
                borderRadius: 8,
              }}
            />
            <Text style={body1}>
              면접관의 눈에 띄는 면접 서류를 작성하기 위해서는 최대한 흔한
              표현을 자제하는 것이 좋습니다.
            </Text>
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
