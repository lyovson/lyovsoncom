'use server'

import { unstable_cacheLife as cacheLife, unstable_cacheTag as cacheTag } from 'next/cache'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { z } from 'zod'
import type { ActionState } from '@/types/grid-enhancements'

const contactSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().optional(),
  projectId: z.coerce.number().optional(),
})

export async function createContact(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  'use cache'
  cacheLife('user-session')

  try {
    const payload = await getPayload({ config: configPromise })

    // Validate input
    const result = contactSchema.safeParse({
      email: formData.get('email'),
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      projectId: formData.get('projectId'),
    })

    if (!result.success) {
      return {
        success: false,
        message: 'Invalid form data',
        errors: result.error.flatten().fieldErrors,
      }
    }

    const { email, firstName, lastName, projectId } = result.data

    // Check if contact already exists
    const existingContact = await payload.find({
      collection: 'contacts',
      where: { email: { equals: email } },
      limit: 1,
    })

    if (existingContact.docs.length > 0) {
      return {
        success: false,
        message: 'You are already subscribed! Thank you for your interest.',
      }
    }

    // Create new contact using correct field names
    const contact = await payload.create({
      collection: 'contacts',
      data: {
        email,
        firstName,
        lastName: lastName || '',
        project: projectId || 1,
      },
    })

    // Note: Background tasks would be handled elsewhere
    console.log('Contact created:', email)

    return {
      success: true,
      message: '✅ Successfully subscribed! Welcome to our community.',
    }
  } catch (error) {
    console.error('Contact creation error:', error)
    return {
      success: false,
      message: 'An unexpected error occurred. Please try again.',
    }
  }
}
