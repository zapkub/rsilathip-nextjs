import * as React from 'react'
import * as propTypes from 'prop-types'

export default class TranslateProvider extends React.Component {
  constructor(props) {
    super()
    this.state = {
      locale: 'th'
    }
  }
  getChildContext() {
    return {
      locale: this.state.locale,
      setLocale: (locale: 'en' | 'th') => {
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

(TranslateProvider as any).childContextTypes = {
  locale: propTypes.string,
  setLocale: propTypes.func
}
