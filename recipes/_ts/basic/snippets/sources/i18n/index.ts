import { useIntl, FormattedMessage, type IntlShape } from 'react-intl'

// Re-export HOC with proper name
export { default as withTranslation } from './withI18n'

// Typed hook alias
export const useI18n = (): IntlShape => useIntl()

// Typed component alias
export const I18nMsg: typeof FormattedMessage = FormattedMessage
