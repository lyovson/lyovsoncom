import React, { Fragment } from 'react'

import type { Props } from './types'
import { ImageMedia } from './ImageMedia'
import { VideoMedia } from './VideoMedia'
import { cn } from '@/lib/utils'

export const Media: React.FC<Props> = (props) => {
  const { className, htmlElement = 'div', resource } = props

  const isVideo = typeof resource === 'object' && resource?.mimeType?.includes('video')
  const Tag = (htmlElement as any) || Fragment

  return (
    <Tag
      {...(htmlElement !== null
        ? {
            className: cn(className, 'contents'),
          }
        : {})}
    >
      {isVideo ? <VideoMedia {...props} /> : <ImageMedia {...props} />}
    </Tag>
  )
}
