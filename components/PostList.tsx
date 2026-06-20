"use client";

import Link from "next/link";
import type { Post } from "@/types/post";

interface PostListProps {
  posts: Post[];
  onEdit: (post: Post) => void;
  onDelete: (id: string) => void;
}

export default function PostList({ posts, onEdit, onDelete }: PostListProps) {
  if (posts.length === 0) {
    return <p className="text-zinc-500">No posts yet</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      {posts.map((post) => (
        <div key={post._id} className="rounded-lg border border-zinc-200 bg-white p-5" >
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <Link href={`/posts/${post.slug}`}>
                <h2 className="text-xl font-semibold text-black hover:underline">
                  {post.title}
                </h2>
              </Link>
              <p className="mt-1 text-sm text-zinc-500">{post.author}</p>
            </div>

            <div className="flex shrink-0 gap-2">
              <button
                onClick={() => onEdit(post)}
                className="rounded-md border border-zinc-300 px-3 py-1.5 text-sm font-medium text-zinc-700 cursor-pointer"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(post._id)}
                className="rounded-md border border-red-200 bg-red-50 px-3 py-1.5 text-sm font-medium text-red-600 cursor-pointer"
              >
                  Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
