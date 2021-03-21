import React from 'react'
import PropTypes from 'prop-types'

const Footer = (props) => {
  const { className, ...rest } = props

  return (
    <div {...rest}>
      <div>
        &copy;{' '}
        <a href="http://react-chef/" target="_blank">
          React Chef
        </a>
        . 2020
      </div>
      <div>React Chef</div>
    </div>
  )
}

Footer.propTypes = {
  className: PropTypes.string,
}

export default Footer
