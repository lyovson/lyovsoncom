import { db } from '@/data/db';
import {
  categories,
  categoryPost,
  images,
  posts,
  tagPost,
  tags,
  users,
} from '@/data/schema';
import { eq } from 'drizzle-orm';
import { PostFull } from '@/data/types/post-full';
import { Post } from '@/data/types';

export async function postSelectFullAll(): Promise<{
  message: string;
  success: boolean;
  posts: PostFull[] | null;
}> {
  const results = await db
    .select({
      post: posts,
      author: users,
      featuredImage: images,
      category: categories,
      tag: tags,
    })
    .from(posts)
    .leftJoin(users, eq(posts.authorId, users.id))
    .leftJoin(images, eq(posts.featuredImageId, images.id)) // Link the featured image
    .leftJoin(categoryPost, eq(posts.id, categoryPost.postId))
    .leftJoin(categories, eq(categoryPost.categoryId, categories.id))
    .leftJoin(tagPost, eq(posts.id, tagPost.postId))
    .leftJoin(tags, eq(tagPost.tagId, tags.id));

  if (results.length === 0) {
    return { message: 'No posts found', success: false, posts: null };
  }

  const postMap = new Map<string, Post>();

  results.forEach((result) => {
    const postId = result.post.id as string;

    if (!postMap.has(postId)) {
      postMap.set(postId, {
        ...result.post,
        author: result.author || undefined,
        featuredImage: result.featuredImage || undefined,
        categories: [],
        tags: [],
      });
    }

    const post = postMap.get(postId);

    if (
      result.category &&
      !post!.categories!.some((cat) => cat.id === result.category.id)
    ) {
      post!.categories!.push(result.category);
    }

    if (result.tag && !post!.tags!.some((tag) => tag.id === result.tag!.id)) {
      post!.tags!.push(result.tag);
    }
  });

  const allPosts = Array.from(postMap.values());

  return { message: 'Success', success: true, posts: allPosts };
}

export async function postSelectFullBySlug(data: {
  slug: string;
}): Promise<{ message: string; success: boolean; post: PostFull | null }> {
  const results = await db
    .select({
      post: posts,
      author: users,
      featuredImage: images,
      category: categories,
      tag: tags,
    })
    .from(posts)
    .leftJoin(users, eq(posts.authorId, users.id))
    .leftJoin(images, eq(posts.featuredImageId, images.id)) // Link the featured image
    .leftJoin(categoryPost, eq(posts.id, categoryPost.postId))
    .leftJoin(categories, eq(categoryPost.categoryId, categories.id))
    .leftJoin(tagPost, eq(posts.id, tagPost.postId))
    .leftJoin(tags, eq(tagPost.tagId, tags.id))
    .where(eq(posts.slug, data.slug));

  if (results.length === 0) {
    return { message: 'No posts found', success: false, post: null };
  }

  const post: Post = results[0].post;
  post.author = results[0].author!;
  post.featuredImage = results[0].featuredImage!;
  post.categories = [];
  post.tags = [];

  results.forEach((result) => {
    if (
      result.category &&
      !post.categories?.some((cat) => cat.id === result.category.id)
    ) {
      post.categories?.push(result.category);
    }
    if (result.tag && !post.tags?.some((tag) => tag.id === result.tag?.id)) {
      post.tags?.push(result.tag);
    }
  });

  return { message: 'Success', success: true, post: post };
}
