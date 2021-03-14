function getSourceCode(appName, { sourceDir }) {
return `import React from 'react'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'

// UI Components.
import { InputTextField } from '@${appName}/${sourceDir.userInterface}'

// Custom Hooks.
import { useI18n } from '@${appName}/${sourceDir.i18n}'

// Utils.
import { RoutePaths } from '@${appName}/${sourceDir.utility}'

const SignIn = (props) => {
  let history = useHistory()
  const { formatMessage } = useI18n()

  return (
    <>
      <section>
        <div>
          <h1>Login Form</h1>
          Username:
          <InputTextField
            name="name"
            value=""
            placeholder={formatMessage({ id: 'user_name' })}
          />
          <button
            onClick={() => {
              history.push(RoutePaths.DashBoard)
            }}
          >
            go to dashboard
          </button>
        </div>
      </section>
    </>
  )
}

SignIn.propTypes = {
  title: PropTypes.string,
}

export default SignIn
`
}

module.exports = {
  getSourceCode,
};
