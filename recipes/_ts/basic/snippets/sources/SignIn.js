function getSourceCode(appName, { sourceDir }) {
return `import React from 'react'
import { useNavigate } from 'react-router-dom'

// UI Components.
import { InputTextField } from '@/components/ui'

// Custom Hooks.
import { useI18n } from '@/${sourceDir.i18n}'

// Utils.
import { RoutePaths } from '@/${sourceDir.utility}'

// Service Hooks
import usePost from '@/${sourceDir.hooks}/usePost'

interface SignInProps {
  title?: string
}

interface PostData {
  id: number
  title: string
  body: string
  userId: number
}

interface PostResponse {
  id: number
  title: string
  body: string
  userId: number
}

const SAMPLE_POST_API_URL = 'https://jsonplaceholder.typicode.com/posts'

const SignIn: React.FC<SignInProps> = (props) => {
  const navigate = useNavigate()
  const { formatMessage } = useI18n()

  const { loading, error, response, sendPostData } = usePost<PostResponse, PostData>(
    SAMPLE_POST_API_URL,
    'sendPostData'
  )

  return (
    <>
      <section>
        <div>
          <h1>Login Form</h1>
          <div>
            {error && 'API is failed'}
            {response && 'Submitted successfully'}
          </div>
          Username:
          <InputTextField
            name="name"
            value=""
            placeholder={formatMessage({ id: 'user_name' })}
          />
          <button
            onClick={async () => {
              await sendPostData({
                id: 1,
                title: 'title',
                body: 'body',
                userId: 1,
              })
              navigate(RoutePaths.DashBoard)
            }}
            disabled={loading}
          >
            go to dashboard
          </button>
        </div>
      </section>
    </>
  )
}

export default SignIn
`

}

module.exports = {
  getSourceCode,
};
