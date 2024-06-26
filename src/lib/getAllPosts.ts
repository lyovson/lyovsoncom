"use server";

import { db } from "@/data/db";
import { Post, User, posts, users } from "@/data/schema";
import { eq } from "drizzle-orm";

export type PostWithUser = { post: Post; user: User | null };

export async function getAllPosts(): Promise<PostWithUser[]> {
  const allPosts = await db
    .select()
    .from(posts)
    .leftJoin(users, eq(posts.authorId, users.id));

  return allPosts;
}

export const getPostsByUser = async (
  email: string
): Promise<PostWithUser[]> => {
  const allPosts = await db
    .select()
    .from(posts)
    .where(eq(users.email, email))
    .leftJoin(users, eq(posts.authorId, users.id));

  return allPosts;
};
