import React, { HTMLAttributes } from 'react'

interface Page {
  title: string
  href?: string
  icon?: string
}

interface SidebarNavProps extends HTMLAttributes<HTMLUListElement> {
  className?: string
  pages: Page[]
}

const SidebarNav: React.FC<SidebarNavProps> = (props) => {
  const { pages, className, ...rest } = props

  return (
    <ul {...rest}>
      {pages.map((page) => (
        <li key={page.title}>
          {page.title}
        </li>
      ))}
    </ul>
  )
}

export default SidebarNav
