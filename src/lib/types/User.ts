export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  createdDate: string; // ISO 8601 format
  updatedDate: string | null;
  profileImageUrl: string | null;
  introduce: string;
  description: string;
}
