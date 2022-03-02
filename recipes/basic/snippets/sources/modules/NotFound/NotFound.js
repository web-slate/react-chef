import React from 'react'
import { useNavigate } from 'react-router-dom'

// Utils.
import { RoutePaths } from '@/utils'

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <section>
      <div>
        <span></span>
        <h1>404 - Page not found</h1>
        <button onClick={() => navigate(RoutePaths.SignIn)}>Go Back</button>
      </div>
    </section>
  )
}

export default NotFound
