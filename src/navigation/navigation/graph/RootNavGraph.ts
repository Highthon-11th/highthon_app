import { User } from '@lib/types/User.ts';
import { Post } from '@lib/types/Post.ts';

type RootNavGraph = {
  Home: undefined;
  Community: undefined;
  Mentoring: any;
  Profile: undefined;
  UploadPostScreen: undefined;
  AddMentor: undefined;
  Question: { post: Post };
  AddMentorScreen: undefined;
  Login: undefined;
  Chat: { chatRoomId: string; user: User };
};

export default RootNavGraph;
