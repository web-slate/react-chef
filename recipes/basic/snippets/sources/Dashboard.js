function getSourceCode(appName, { sourceDir }) {
return `import React from 'react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'

import { I18nMsg } from '@/${sourceDir.i18n}'

// Utils.
import { RoutePaths } from '@/${sourceDir.utility}'

// Service Hooks
import useFetch from '@/${sourceDir.hooks}/useFetch'

const SAMPLE_GET_API_URL = 'https://jsonplaceholder.typicode.com/users'

const Dashboard = (props) => {
  const navigate = useNavigate()

  const { loading, error, response = [] } = useFetch(SAMPLE_GET_API_URL)

  if (loading) return 'Loading..'
  if (error) return error.message

  return (
    <>
      <section>
        <div>
          <h1>
            <I18nMsg id="dashboard" /> goes here
          </h1>
          {response.map((user) => {
            return <li key={user.id}>{user.name}</li>
          })}
          <button
            onClick={() => {
              navigate(RoutePaths.SignIn)
            }}
          >
            Click back
          </button>
        </div>
      </section>
    </>
  )
}

Dashboard.propTypes = {
  title: PropTypes.string,
}

export default Dashboard
`
}

module.exports = {
  getSourceCode,
};