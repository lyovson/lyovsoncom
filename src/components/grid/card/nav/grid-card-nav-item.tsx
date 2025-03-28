import Link from 'next/link'
import { ReactNode } from 'react'

import { GridCardSection } from '../section'

type GridCardNavItemProps = {
  children: ReactNode
  link?: string
  onClick?: () => void
  className?: string
}

export const GridCardNavItem = ({ children, link, onClick, className }: GridCardNavItemProps) => {
  if (link) {
    return (
      <GridCardSection onClick={onClick} className={className}>
        <Link href={link} className={` flex flex-col gap-2 items-center justify-center h-full `}>
          {children}
        </Link>
      </GridCardSection>
    )
  }
  return (
    <GridCardSection
      onClick={onClick}
      className={` flex flex-col gap-2 items-center justify-center h-full cursor-pointer ${className}`}
    >
      {children}
    </GridCardSection>
  )
}
