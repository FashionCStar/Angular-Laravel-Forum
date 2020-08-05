import {User} from "./user";
export class Topic {
  id: number;
  title: string;
  content: string;
  view_count: number;
  category_id: number;
  user_id: number;
  is_approved: number;
  is_private: number;
  user: User;
  created_at: any;
  updated_at: any;
  posts: any[];
}
