import { User } from '@lib/types/User.ts';

type RootNavGraph = {
  Home: undefined;
  Community: undefined;
  Mentoring: any;
  Profile: undefined;
  UploadPostScreen: undefined;
  AddMentor: undefined;
  Question: undefined;
  AddMentorScreen: undefined;
  Chat: { chatRoomId: string; user: User };
};

export default RootNavGraph;
