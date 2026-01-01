function getSourceCode(appName, { sourceDir }) {
return `import React, { HTMLAttributes } from 'react'
import { useI18n } from '@/${sourceDir.i18n}'

// Domain Components.
import SidebarNav from './SidebarNav'

// Utils.
import { RoutePaths } from '@/${sourceDir.utility}'

interface Page {
  title: string
  href: string
  icon: string
}

interface SidebarProps extends HTMLAttributes<HTMLDivElement> {
  open: boolean
  variant: string
  onClose?: () => void
  className?: string
}

const Sidebar: React.FC<SidebarProps> = (props) => {
  const { open, variant, onClose, className, ...rest } = props
  const { formatMessage } = useI18n()

  const pages: Page[] = [
    {
      title: formatMessage({ id: 'dashboard' }),
      href: RoutePaths.dashboard,
      icon: '',
    },
    {
      title: formatMessage({ id: 'other_module' }),
      href: RoutePaths.dashboard,
      icon: '',
    },
  ]

  return (
    <section>
      <div {...rest}>
        <SidebarNav pages={pages} />
      </div>
    </section>
  )
}

export default Sidebar
`

}

module.exports = {
  getSourceCode,
};