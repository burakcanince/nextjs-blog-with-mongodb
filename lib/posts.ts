import "server-only";

import { Collection, ObjectId, WithId } from "mongodb";
import clientPromise from "@/lib/mongodb";
import type { PaginatedPosts, Post } from "@/types/post";

type MongoPost = {
  slug?: string;
  title: string;
  author: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
};

async function getCollection(): Promise<Collection<MongoPost>> {
  const client = await clientPromise;
  return client.db("blog").collection("posts");
}

function serializePost(post: WithId<MongoPost>): Post {
  return {
    _id: post._id.toString(),
    slug: post.slug ?? post._id.toString(),
    title: post.title,
    author: post.author,
    description: post.description,
  };
}

interface PaginationOptions {
  page?: number;
  limit?: number;
}

export async function getPaginatedPosts({
  page = 1,
  limit = 3,
}: PaginationOptions = {}): Promise<PaginatedPosts> {
  const pageNumber = Math.max(page, 1);
  const pageLimit = Math.max(limit, 1);
  const skip = (pageNumber - 1) * pageLimit;

  const collection = await getCollection();

  const [posts, total] = await Promise.all([
    collection
      .find({})
      .sort({ _id: -1 })
      .skip(skip)
      .limit(pageLimit)
      .toArray(),
    collection.countDocuments(),
  ]);

  return {
    posts: posts.map(serializePost),
    total,
    page: pageNumber,
    limit: pageLimit,
    totalPages: Math.max(Math.ceil(total / pageLimit), 1),
  };
}

export async function getPostById(id: string): Promise<Post | null> {
  if (!ObjectId.isValid(id)) return null;

  const collection = await getCollection();
  const post = await collection.findOne({ _id: new ObjectId(id) });

  if (!post) return null;

  return serializePost(post);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const collection = await getCollection();
  const post = await collection.findOne({ slug });

  if (!post) return null;

  return serializePost(post);
}

interface CreatePostData {
  title: string;
  author: string;
  description: string;
}

export async function createPost(post: CreatePostData): Promise<string> {
  const collection = await getCollection();

  const result = await collection.insertOne({
    title: post.title,
    author: post.author,
    description: post.description,
    createdAt: new Date(),
  });

  return result.insertedId.toString();
}

interface UpdatePostData {
  title?: string;
  author?: string;
  description?: string;
}

export async function updatePost(
  id: string,
  post: UpdatePostData
): Promise<boolean> {
  if (!ObjectId.isValid(id)) return false;

  const collection = await getCollection();

  const result = await collection.updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        ...(post.title && { title: post.title }),
        ...(post.author && { author: post.author }),
        ...(post.description && { description: post.description }),
        updatedAt: new Date(),
      },
    }
  );

  return result.matchedCount > 0;
}

export async function deletePost(id: string): Promise<boolean> {
  if (!ObjectId.isValid(id)) return false;

  const collection = await getCollection();

  const result = await collection.deleteOne({
    _id: new ObjectId(id),
  });

  return result.deletedCount > 0;
}
