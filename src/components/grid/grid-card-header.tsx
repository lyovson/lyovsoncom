import { GridCard } from '@/components/grid/grid-card'
import Link from 'next/link'
import { Home, User } from 'lucide-react'
import { GridCardNavItem } from './grid-card-nav/grid-card-nav-item'
import { GridCardSection } from './grid-card-section'

export const GridCardHeader = async ({ className }: { className?: string }) => {
  return (
    <GridCard className={`col-start-1 col-end-2 row-start-1 row-end-2 ${className}`}>
      <GridCardSection className={`row-start-1 row-end-3 col-start-1 col-end-4`}>
        <Link className={` flex flex-col h-full justify-center items-center`} href="/">
          <h1 className={`text-3xl text-center`}>Lyovson.com</h1>
        </Link>
      </GridCardSection>

      <GridCardNavItem link="/jess">
        <User className="w-7 h-7" />
        <span>Jess</span>
      </GridCardNavItem>
      <GridCardNavItem link="/">
        <Home className="w-7 h-7" />
        <span>Home</span>
      </GridCardNavItem>
      <GridCardNavItem link="/rafa">
        <User className="w-7 h-7" />
        <span>Rafa</span>
      </GridCardNavItem>
      {/* <GridCardNavItem link="/posts">
        <Newspaper className="w-7 h-7" />
        <span>Posts</span>
      </GridCardNavItem>
      <GridCardNavItem link="/contact">
        <Contact className="w-7 h-7" />
        <span>Contact</span>
      </GridCardNavItem> */}
    </GridCard>
  )
}
