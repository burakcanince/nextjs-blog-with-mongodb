"use client";

import { useState } from "react";
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import BlogPagination from "@/components/BlogPagination";
import type { PaginatedPosts, Post } from "@/types/post";

interface BlogPageProps {
  initialData: PaginatedPosts;
}

export default function BlogPage({ initialData }: BlogPageProps) {
  const [posts, setPosts] = useState<Post[]>(initialData.posts);
  const [page, setPage] = useState(initialData.page);
  const [totalPages, setTotalPages] = useState(initialData.totalPages);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [showForm, setShowForm] = useState(false);

  async function fetchPosts(nextPage = page) {
    const res = await fetch(`/api/posts?page=${nextPage}&limit=${initialData.limit}`);
    if (!res.ok) return;

    const data: PaginatedPosts = await res.json();
    setPosts(data.posts);
    setPage(data.page);
    setTotalPages(data.totalPages);
  }

  function handleEdit(post: Post) {
    setEditingPost(post);
    setShowForm(true);
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this post?")) return;
    await fetch(`/api/posts/${id}`, { method: "DELETE" });
    const nextPage = posts.length === 1 && page > 1 ? page - 1 : page;
    fetchPosts(nextPage);
  }

  function handleSaved() {
    setEditingPost(null);
    setShowForm(false);
    fetchPosts(editingPost ? page : 1);
  }

  function handleCancel() {
    setEditingPost(null);
    setShowForm(false);
  }

  return (
    <>
      <PostList posts={posts} onEdit={handleEdit} onDelete={handleDelete} />

      {showForm ? (
        <PostForm
          key={editingPost?._id ?? "new"}
          editingPost={editingPost}
          onCancel={handleCancel}
          onSaved={handleSaved}
        />
      ) : (
        <button
          onClick={() => setShowForm(true)}
          className="flex justify-center rounded-md bg-zinc-900 p-3 text-sm text-white w-full cursor-pointer mt-8"
        >
          Add Post
        </button>
      )}

      <BlogPagination
        page={page}
        totalPages={totalPages}
        onPageChange={fetchPosts}
      />
    </>
  );
}
