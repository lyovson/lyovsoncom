import React from 'react'

import type { Post } from '@/payload-types'
import { GridCardPostFull, GridCardPostSearch } from '@/components/grid'

export type Props = {
  posts: Post[]
  search?: boolean
}

export const CollectionArchive: React.FC<Props> = (props) => {
  const { posts, search } = props

  return (
    <>
      {posts?.map((result, index) => {
        if (typeof result === 'object' && result !== null) {
          return search ? (
            <GridCardPostSearch key={result.slug} post={result} />
          ) : (
            <GridCardPostFull
              key={result.slug}
              post={result}
              {...(index === 0 && {
                loading: 'eager',
                fetchPriority: 'high',
                priority: true,
              })}
            />
          )
        }

        return null
      })}
    </>
  )
}
