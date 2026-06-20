import { NextResponse } from "next/server";
import { createPost, getPaginatedPosts } from "@/lib/posts";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page")) || undefined;
  const limit = Number(searchParams.get("limit")) || undefined;

  const data = await getPaginatedPosts({ page, limit });
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.title || !body.author || !body.description) {
    return NextResponse.json(
      { error: "title, author and description fields are required" },
      { status: 400 }
    );
  }

  const id = await createPost({
    title: body.title,
    author: body.author,
    description: body.description,
  });

  return NextResponse.json(
    { message: "Post added", id },
    { status: 201 }
  );
}
