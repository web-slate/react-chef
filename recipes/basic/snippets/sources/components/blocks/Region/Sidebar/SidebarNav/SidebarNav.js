import React from 'react'
import PropTypes from 'prop-types'

const SidebarNav = (props) => {
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

SidebarNav.propTypes = {
  className: PropTypes.string,
  pages: PropTypes.array.isRequired,
}

export default SidebarNav
