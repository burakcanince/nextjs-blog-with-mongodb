import { NextResponse } from "next/server";
import { deletePost, getPostById, updatePost } from "@/lib/posts";

type Params = Promise<{ id: string }>;

export async function GET(_req: Request, { params }: { params: Params }) {
  const { id } = await params;
  const post = await getPostById(id);

  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  return NextResponse.json(post);
}

export async function PUT(req: Request, { params }: { params: Params }) {
  const { id } = await params;
  const body = await req.json();

  const updated = await updatePost(id, {
    title: body.title,
    author: body.author,
    description: body.description,
  });

  if (!updated) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Post updated" });
}

export async function DELETE(_req: Request, { params }: { params: Params }) {
  const { id } = await params;
  const deleted = await deletePost(id);

  if (!deleted) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Post deleted" });
}
