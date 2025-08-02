import Header from '@/components/Header';
import { COLOR } from '@/styles/color/color';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootNavGraph } from '@navigation/navigation/graph';
import firestore from '@react-native-firebase/firestore';
import { authClient } from '@lib/client';
import { Message } from '@/lib/types/Message';
import ChatBox from '@components/chat/ChatBox.tsx';

interface Props extends NativeStackScreenProps<RootNavGraph, 'Chat'> {}

const ChatScreen = ({ route }: Props) => {
  const { chatRoomId, user } = route.params;
  console.log('ChatRoomId:', chatRoomId);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    let isInitialLoad = true;

    const unsubscribe = firestore()
      .collection(`chatRooms/${chatRoomId}/messages`)
      .orderBy('createdDate', 'asc')
      .onSnapshot(snapshot => {
        if (isInitialLoad) {
          isInitialLoad = false;

          const initialMessages: Message[] = snapshot.docs.map(doc => {
            return doc.data() as Message;
          });

          setMessages(initialMessages);
          return;
        }

        snapshot.docChanges().forEach(change => {
          if (change.type === 'added') {
            const newMessage = change.doc.data() as Message;

            setMessages(prev => [...prev, newMessage]);
          }
        });
      });

    return () => unsubscribe();
  }, [chatRoomId, setMessages]);

  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    console.log('Sending message');

    if (message.trim()) {
      authClient
        .post('/mentoring/chat/send', {
          chatRoomId,
          message,
        })
        .then(response => {
          console.log('메시지 전송 성공:', response.data);
        })
        .catch(error => {
          console.error('메시지 전송 실패:', error);
        });
      setMessage('');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title={`멘토 ${user.name}`} />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <FlatList
          style={styles.wrapper}
          data={messages}
          renderItem={({ item }) => <ChatBox data={item} />}
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />} // 세로 간격
        />
        <View style={{ height: 12 }}></View>

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
    paddingVertical: 20,
  },
  scrollContent: {
    paddingBottom: 80,
  },
  contentWrap: {
    flex: 1,
  },
  messageInputContainer: {
    // position: 'absolute',
    // bottom: 0,
    // left: 0,
    // right: 0,
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
