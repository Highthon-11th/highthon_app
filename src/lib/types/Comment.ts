export interface Comment {
  id: string;
  content: string;
  postId: string;
  createdDate: string; // ISO 8601 format
  updatedDate: string; // ISO 8601 format
  authorId: string;
  authorName: string;
  authorType: 'MENTOR' | 'MENTEE';
}
