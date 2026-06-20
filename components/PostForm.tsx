"use client";

import { useState } from "react";
import type { Post } from "@/types/post";

interface PostFormProps {
  editingPost: Post | null;
  onCancel: () => void;
  onSaved: () => void;
}

export default function PostForm({
  editingPost,
  onCancel,
  onSaved,
}: PostFormProps) {
  const [title, setTitle] = useState(editingPost?.title ?? "");
  const [author, setAuthor] = useState(editingPost?.author ?? "");
  const [description, setDescription] = useState(editingPost?.description ?? "");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const payload = { title, author, description };

    if (editingPost) {
      await fetch(`/api/posts/${editingPost._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } else {
      await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    }

    setLoading(false);
    onSaved();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 rounded-lg border border-zinc-200 bg-white p-6"
    >
      <h2 className="mb-4 text-lg font-semibold">
        {editingPost ? "Update Post" : "Add New Post"}
      </h2>

      <div className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none"
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
          className="rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows={4}
          className="rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none resize-none"
        />
      </div>

      <div className="mt-4 flex gap-2">
        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white cursor-pointer"
        >
          {editingPost ? "Update" : "Add"}
        </button>
          <button
            type="button"
            onClick={onCancel}
            className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 cursor-pointer"
          >
            Cancel
          </button>
      </div>
    </form>
  );
}
