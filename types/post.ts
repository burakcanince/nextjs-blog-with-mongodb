export interface Post {
  _id: string;
  slug: string;
  title: string;
  author: string;
  description: string;
}

export interface PaginatedPosts {
  posts: Post[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
