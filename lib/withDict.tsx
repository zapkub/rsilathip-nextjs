import * as React from 'react'
import * as propTypes from 'prop-types'
import hoistNonStatic from 'hoist-non-react-statics'
import thLang from '../static/th-th.json'
import enLang from '../static/en-us.json'
const i18n = {
  th: thLang,
  en: enLang
}
declare global {
  interface WithDictPropTypes {
    t: (s: string) => string
    locale: string
  }
}
export function translate(key, data = {}, lang: string) {
  if (!data) data = {}
  if (!i18n[lang][key]) {
    return key + (!Object.keys(data).length ? '' : JSON.stringify(data))
  }
  return Object.keys(data).reduce((result, key) => {
    return result.replace(`$${key}`, data[key])
  }, i18n[lang][key])
}

export default Component => {
  // @ts-ignore
  class WithTranslate extends React.Component {
    constructor(props) {
      super(props)
      this.translate = this.translate.bind(this)
    }
    translate(key, data = {}) {
      return translate(key, data, this.context.locale)
    }
    render() {
      return (
        <Component
          locale={this.context.locale}
          t={this.translate}
          {...this.props}
        />
      )
    }
  }

  (WithTranslate as any).contextTypes = {
    locale: propTypes.string
  }
  return hoistNonStatic(WithTranslate, Component)
}
