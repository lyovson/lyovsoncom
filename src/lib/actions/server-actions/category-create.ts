'use server';

import { db } from '@/data/db';
import { categories } from '@/data/schema';
import { eq } from 'drizzle-orm';
import { createInsertSchema } from 'drizzle-zod';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { categoryInsert } from '@/lib/actions/db-actions/category';

export const categoryCreateAction = async (
  _prevState: { message: string; success: boolean },
  formData: FormData,
): Promise<{ success: boolean; message: string }> => {
  const data = {
    name: formData.get('name'),
    slug: formData.get('slug'),
  };

  const existingCategory = await db
    .select()
    .from(categories)
    .where(eq(categories.name, data.name));

  if (existingCategory.length > 0) {
    return { message: 'Category already exists', success: false };
  }

  const schema = createInsertSchema(categories, {
    name: z.string().min(1, { message: 'Name is required' }),
    slug: z.string().min(1, { message: 'Slug is required' }),
  });

  const parsedData = schema.safeParse(data);

  if (!parsedData.success) {
    return { message: 'Wrong data', success: false };
  }
  const result = await categoryInsert(data);
  if (!result.success) {
    return { message: result.message, success: result.success };
  }
  revalidatePath('/dungeon/categories');
  return { message: result.message, success: result.success };
};