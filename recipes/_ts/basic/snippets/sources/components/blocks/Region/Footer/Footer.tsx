import React, { HTMLAttributes } from 'react'

interface FooterProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
}

const Footer: React.FC<FooterProps> = (props) => {
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

export default Footer
