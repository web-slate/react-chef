import React from 'react'
import { withRouter } from 'react-router-dom'

const NotFound = (props) => {
  const { history } = props

  return (
    <section>
      <div>
        <span></span>
        <h1>404 - Page not found</h1>
        <Button onClick={() => history.replace('/sign-in')}>Go Back</Button>
      </div>
    </section>
  )
}

export default withRouter(NotFound)
