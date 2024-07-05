import { tags } from '@/data/schema';
import { db } from '@/data/db';
import { TagAllResponse } from '@/lib/actions/db-actions/tag';

export async function tagSelectAll(): Promise<TagAllResponse> {
  try {
    const allTags = await db.select().from(tags);
    return {
      success: true,
      tags: allTags,
      message: 'Tags selected successfully',
    };
  } catch (error) {
    return {
      success: false,
      tags: null,
      message: 'Failed to select tags',
      error,
    };
  }
}
