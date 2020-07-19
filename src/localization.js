import React from 'react'
import { ConfigProvider } from 'antd'
import { IntlProvider } from 'react-intl'
import { connect } from 'react-redux'

import english from './locales/en-US'
import french from './locales/fr-FR'

const locales = {
  'en-US': english,
  'fr-FR': french,
}

@connect(({ settings }) => ({ settings }))
class Localization extends React.Component {
  render() {
    const {
      children,
      settings: { locale },
    } = this.props
    const currentLocale = locales[locale]
    return (
      <ConfigProvider locale={currentLocale.localeAntd}>
        <IntlProvider locale={currentLocale.locale} messages={currentLocale.messages}>
          {children}
        </IntlProvider>
      </ConfigProvider>
    )
  }
}

export default Localization
