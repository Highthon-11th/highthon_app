export interface Post {
  id: string;
  title: string;
  content: string;
  type: 'INFORMATION' | 'QUESTION';

  imageUrl: string | null;

  tags: string[];

  authorId: string;
  authorName: string;
  authorType: 'MENTOR' | 'MENTEE';

  createdDate: string; // ISO 8601 format (Instant)
  updatedDate: string | null;
}

export interface Tag {
  id: number;
  label: string;
}
