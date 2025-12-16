function getSourceCode(appName, { sourceDir }) {
const langUrl = `${sourceDir.locales}/` + '${lang}.json'

return `import React, { useState, useEffect, ComponentType, FC } from 'react'
import { IntlProvider } from 'react-intl'
import axios from 'axios'

const fetchTranslations = async (lang: string) => {
  return await axios.get<Record<string, string>>(\`${langUrl}\`)
}

const withI18n = <P extends object>(Component: ComponentType<P>): FC<P> => (props: P) => {
  const [messages, setMessages] = useState<Record<string, string>>({})
  const locale = 'en'

  useEffect(() => {
    fetchTranslations(locale).then((response) => {
      setMessages(response.data)
    })
  }, [])

  return (
    <IntlProvider
      locale={locale}
      defaultLocale={locale}
      messages={messages}
      onError={() => {}}
    >
      <Component {...props} />
    </IntlProvider>
  )
}

export default withI18n
`
}

module.exports = {
  getSourceCode,
};