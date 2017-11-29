import * as React from 'react'
import TranslateProvider from '../lib/TranslateProvider'
import { withState, compose, withProps, lifecycle } from 'recompose'
import styled, { ThemeProvider } from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import ProductGallery from '../components/ProductGallery'
import config from '../config'
import withPromises from '../lib/withPromises'
import theme from '../theme'
import Menubar from '../components/Menubar'
import Footer from '../components/common/Footer'
import objectPath from 'object-path'
import withDict from '../lib/withDict'

const ProductGalleryWithData = compose<
  { loadmoreGallery?: (page: number) => void },
  {}
>(
  withDict,
  withState('gallery', 'setGallery', []),
  withState('isEnd', 'setIsEnd', false),
  withState('page', 'setPage', 1),
  withState('loading', 'setLoading', true),
  withProps((props: any) => {
    return {
      loadmoreGallery: async () => {
        props.setLoading(true)
        const result = await config.getProductListData(props.page)
        props.setPage(props.page + 1)
        props.setGallery([...props.gallery, ...result])
        if (result.length < 10) {
          props.setIsEnd(true)
        }
        props.setLoading(false)
      }
    }
  }),
  lifecycle<any, any, any>({
    componentDidMount() {
      this.props.loadmoreGallery(this.props.page)
    }
  })
)(ProductGallery)

const PaddingMenubar = styled.div`
  min-height: 100vh;
  ${breakpoint('mobile')`
    padding-top: 60px;
  `} ${breakpoint('tablet')`
    padding-top: 90px;
  `};
`
export default class ProductPage extends React.Component<{}, {}> {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <TranslateProvider>
          <Menubar active={'products'} />
          <PaddingMenubar>
            <ProductGalleryWithData />
          </PaddingMenubar>
          <Footer />
        </TranslateProvider>
      </ThemeProvider>
    )
  }
}
