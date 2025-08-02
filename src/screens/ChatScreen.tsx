import Me from '@/components/chat/Me';
import Mentor from '@/components/chat/Mentor';
import Header from '@/components/Header';
import { COLOR } from '@/styles/color/color';
import { useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

const ChatScreen = () => {
  const route = useRoute();
  const params = route.params;
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log('메시지 전송:', message);
      setMessage('');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="누구 멘토" />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          style={styles.wrapper}
          contentContainerStyle={styles.scrollContent}
        >
          <Mentor message="앙기모찌" name="누구 멘토" />
          <Me message="누구임" />
          <Mentor
            message="안녕하세요! 궁금한 것이 있으시면 언제든지 물어보세요."
            name="누구 멘토"
          />
          <Me message="면접 준비는 어떻게 해야 할까요?" />
          <Mentor
            message="면접 준비는 여러 단계로 나누어서 체계적으로 접근하는 것이 좋습니다. 먼저 지원하는 회사와 직무에 대해 충분히 조사해보세요."
            name="누구 멘토"
          />
        </ScrollView>

        <View style={styles.messageInputContainer}>
          <TextInput
            style={styles.messageInput}
            placeholder="메시지를 입력하세요"
            placeholderTextColor={COLOR.stroke}
            value={message}
            onChangeText={setMessage}
            multiline={true}
            maxLength={1000}
          />
          <TouchableOpacity
            style={[
              styles.sendButton,
              { backgroundColor: message.trim() ? COLOR.main : COLOR.stroke },
            ]}
            onPress={handleSendMessage}
            disabled={!message.trim()}
          >
            <Text
              style={[
                styles.sendButtonText,
                { color: message.trim() ? '#fff' : COLOR.black },
              ]}
            >
              전송
            </Text>
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
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  scrollContent: {
    paddingBottom: 80,
  },
  contentWrap: {
    flex: 1,
  },
  messageInputContainer: {
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
  messageInput: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    maxHeight: 100,
    fontSize: 14,
    lineHeight: 20,
    borderWidth: 1,
    borderColor: COLOR.stroke,
  },
  sendButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 50,
  },
  sendButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export default ChatScreen;
