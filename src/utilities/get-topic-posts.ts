import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { unstable_cacheTag as cacheTag, unstable_cacheLife as cacheLife } from 'next/cache'

export async function getTopicPosts(slug: string) {
  'use cache'
  cacheTag('posts')
  cacheTag('topics')
  cacheTag(`topic-${slug}`)
  cacheLife('posts')

  const payload = await getPayload({ config: configPromise })

  const topic = await payload.find({
    collection: 'topics',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })

  const topicId = topic.docs[0]?.id

  if (!topicId) {
    return null
  }

  return await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 12,
    where: {
      topics: {
        contains: topicId,
      },
    },
    overrideAccess: false,
    sort: 'createdAt:desc',
  })
}
