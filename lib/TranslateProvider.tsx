import * as React from 'react'
import * as propTypes from 'prop-types'

export default class TranslateProvider extends React.Component<
  {},
  { locale: string }
> {
  constructor(props) {
    super(props)
    if (typeof window !== 'undefined') {
      this.state = {
        locale: (window as any).locale || 'th'
      }
    } else {
      this.state = {
        locale: 'th'
      }
    }
  }
  getChildContext() {
    return {
      locale: this.state.locale,
      setLocale: (locale: 'en' | 'th') => {
        (window as any).locale = locale
        this.setState({
          locale
        })
      }
    }
  }
  render() {
    return this.props.children
  }
}

;(TranslateProvider as any).childContextTypes = {
  locale: propTypes.string,
  setLocale: propTypes.func
}
