import type { Metadata } from 'next/types'
import { CollectionArchive } from '@/components/CollectionArchive'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import { GridCardHeader } from 'src/components/grid/card/header'
import { notFound } from 'next/navigation'
export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const response = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 12,
    overrideAccess: false,
  })

  if (!response) {
    return notFound()
  }

  const { docs, totalPages, page } = response

  return (
    <>
      <GridCardHeader />
      <CollectionArchive posts={docs} />

      <div className="container">
        {totalPages > 1 && page && <Pagination page={page} totalPages={totalPages} />}
      </div>
    </>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Posts | Lyovson.com`,
    description: 'Official website of Rafa and Jess Lyovsons',
  }
}
