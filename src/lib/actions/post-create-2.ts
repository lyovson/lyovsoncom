"use server";

import { NewPost, Post, postInsertSchema } from "@/data/schema";
import { capitalize, slugify } from "@/lib/utils";
import { redirect } from "next/navigation";
import { categoryPostCreate } from "./db-actions/category-post-create";
import { categorySelectBySlug } from "./db-actions/category-select";
import { postInsert } from "./db-actions/post-insert";
import { tagCreate } from "./db-actions/tag-create";
import { tagPostCreate } from "./db-actions/tag-post-create";
import { tagSelectBySlug } from "./db-actions/tag-select";

export async function postCreate(
  content: any, // Changed JSON to any for better TypeScript compatibility
  _prevState: { message: string; success: boolean; post: Post | null },
  formData: FormData
): Promise<{ success: boolean; message: string; post: Post | null }> {
  const data: NewPost = {
    title: formData.get("title") as string,
    slug: slugify(formData.get("title") as string),
    featuredImageId: formData.get("featuredImageId") as string,
    published: formData.get("published") === "on" ? true : false,
    content: JSON.stringify(content),
    type: formData.get("type") as string,
    authorId: formData.get("authorId") as string,
    createdAt: new Date(formData.get("createdAt") as string),
  };

  const parsedData = postInsertSchema.safeParse(data);

  if (!parsedData.success) {
    console.log("Validation error", parsedData.error.issues);
    return { message: "Validation error", success: false, post: null };
  }

  try {
    const { post: newPost } = await postInsert(data);

    if (!newPost) {
      return { message: "Post not found", success: false, post: null };
    }

    const category = formData.get("category") as string;
    if (category) {
      const result = await categorySelectBySlug(category);
      if (result.success && result.category) {
        await categoryPostCreate({
          postId: newPost.id,
          categoryId: result.category.id,
        });
      }
    }

    const tags = formData.getAll("tags") as string[];
    tags
      .filter((tag) => tag !== "")
      .forEach(async (tag) => {
        const result = await tagSelectBySlug(slugify(tag));
        let tagId;
        if (result.success && result.tag) {
          tagId = result.tag.id;
        } else {
          const { tag: newTag } = await tagCreate({
            slug: slugify(tag),
            name: capitalize(tag),
          });

          if (newTag) {
            tagId = newTag.id;
          }
        }
        if (tagId) {
          await tagPostCreate({ postId: newPost.id, tagId });
        } else {
          console.error("Failed to create tag");
        }
      });
    redirect("/dungeon/posts");
    return {
      message: "Post created successfully",
      success: true,
      post: newPost,
    };
  } catch (error) {
    console.error("Failed to insert post:", error);
    return {
      message: "Failed to insert post",
      success: false,
      post: null,
    };
  }
}
