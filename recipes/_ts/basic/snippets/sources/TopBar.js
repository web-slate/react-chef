function getSourceCode(appName, { sourceDir }) {
return `import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import PropTypes from 'prop-types'

import { I18nMsg } from '@/${sourceDir.i18n}'

const TopBar = (props) => {
  const { className, ...rest } = props

  return (
    <header {...rest}>
      <RouterLink to="/">
        <I18nMsg id="app_name" />
      </RouterLink>
    </header>
  )
}

TopBar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func,
}

export default TopBar
`
}

module.exports = {
  getSourceCode,
};