import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/posts";

type Params = Promise<{ slug: string }>;

export default async function PostDetailPage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-zinc-50 p-8">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm font-medium text-zinc-600 hover:text-zinc-900"
        >
          <ChevronLeft size={16} />
          Back to posts
        </Link>

        <div className="mt-8 rounded-lg border border-zinc-300 bg-white p-8">
          <h1 className="text-3xl font-bold text-black">{post.title}</h1>
          <p className="mt-2 text-sm text-zinc-500">{post.author}</p>
          <p className="mt-6 leading-relaxed text-zinc-700">
            {post.description}
          </p>
        </div>
      </div>
    </div>
  );
}
