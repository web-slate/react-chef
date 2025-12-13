function getSourceCode(appName, { sourceDir }) {
return `import React, { HTMLAttributes } from 'react'
import { Link as RouterLink } from 'react-router-dom'

import { I18nMsg } from '@/${sourceDir.i18n}'

interface TopBarProps extends HTMLAttributes<HTMLElement> {
  className?: string
  onSidebarOpen?: () => void
}

const TopBar: React.FC<TopBarProps> = (props) => {
  const { className, ...rest } = props

  return (
    <header {...rest}>
      <RouterLink to="/">
        <I18nMsg id="app_name" />
      </RouterLink>
    </header>
  )
}

export default TopBar
`
}

module.exports = {
  getSourceCode,
};