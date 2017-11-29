import hoistNonStatic from 'hoist-non-react-statics'
import * as React from 'react'

export default (
  mapResultFromProps: (props: any) => { [key: string]: Promise<any> }
) => Component => {
  class WithPromises extends React.Component< {}, { loading: boolean; results: any } > {
    constructor(props) {
      super(props)
      this.state = {
        loading: true,
        results: {}
      }
    }
    async resolvePromise() {
      const results = {}
      const PromisesList = mapResultFromProps(this.props)
      await Promise.all(
        Object.keys(PromisesList).map(async key => {
          const result = await PromisesList[key]
          results[key] = result
        })
      )
      this.setState({
        results,
        loading: false
      })
    }
    async componentDidMount() {
      await this.resolvePromise()
    }
    async componentDidUpdate(prevProps) {
      if (this.props !== prevProps) {
        await this.resolvePromise()
      }
    }
    render() {
      return React.createElement(Component, {
        ...this.props,
        loading: this.state.loading,
        results: this.state.results
      })
    }
  }
  return hoistNonStatic(WithPromises, Component)
}
