"use server";

import { auth } from "@/data/auth";
import { db } from "@/data/db";
import { NewSocialNetwork, socialNetworks } from "@/data/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import z from "zod";
import { newSocialSchema } from "./createSocialScema";

// Create a new social network

export type FormState = {
  message: string;
  social?: z.infer<typeof newSocialSchema>;
  issues?: string[];
  fields?: Record<string, string>;
};
export const createSocial = async (
  _prevState: FormState,
  formData: FormData
) => {
  const data = Object.fromEntries(formData);
  const parsed = await newSocialSchema.safeParseAsync(data);

  // Check if user is authenticated

  const session = await auth();
  if (!session || !session.user) {
    revalidatePath("/login");
    return { message: "Not authenticated" };
  }
  const { id } = session.user!;
  const payload: NewSocialNetwork = {
    ...data,
    userId: id!,
  };

  if (!parsed.success) {
    const fields: Record<string, string> = {};
    for (const key of Object.keys(formData)) {
      fields[key] = data[key].toString();
    }
    return {
      message: "Invalid form data",
      fields,
      issues: parsed.error.issues.map((issue) => issue.message),
    };
  } else {
    await db.insert(socialNetworks).values(payload);
    revalidatePath("/account");
    return {
      message: "Social Network added!",
      social: parsed.data,
    };
  }
};

// Delete a social network

export const deleteSocial = async (id: string) => {
  await db.delete(socialNetworks).where(eq(socialNetworks.id, id));
  revalidatePath("/account");
};
