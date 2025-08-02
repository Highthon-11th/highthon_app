import { Timestamp } from '@react-native-firebase/firestore';

export interface Message {
  id: string;
  senderId: string; // ID of the user who sent the message
  message: string; // The content of the message
  timestamp: Timestamp; // ISO 8601 format for the time the message was sent
}
