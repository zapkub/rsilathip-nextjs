import * as React from 'react'
import config from '../config'
import HeroImage from '../components/HeroImage'
import Footer from '../components/common/Footer'
import ServiceList from '../components/Services'
import Menubar from '../components/Menubar'
import { compose, withProps } from 'recompose'
import AboutUs from '../components/AboutUs'
import withPromises from '../lib/withPromises'
import objectPath from 'object-path'
import withDict from '../lib/withDict'
import TranslateProvider from '../lib/TranslateProvider'
import { ThemeProvider } from 'styled-components'
import theme from '../theme'

const AboutUsWithData = compose(
  withDict,
  withPromises(props => ({
    content: config.getIndexPageData(props.locale)
  })),
  withProps(props => {
    const aboutusHTML = objectPath(props).get(
      'results.content.aboutus.content.rendered'
    )
    const founderHTML = objectPath(props).get(
      'results.content.founder.content.rendered'
    )
    return {
      aboutusHTML,
      founderHTML
    }
  })
)(AboutUs)

const HeroImageWithData = compose(
  withPromises(props => ({
    data: config.getBannerData()
  }))
)(HeroImage)

const ServiceListWithData = compose(
  withPromises(props => ({
    data: config.getServiceData(props.locale)
  })),
  withProps(props => {
    const data = objectPath(props).get('results.data', [])
    return {
      services: data.map(service => service)
    }
  })
)(ServiceList)

export default class LandingPage extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <TranslateProvider>
          <Menubar />
          <HeroImageWithData />
          <AboutUsWithData />
          <ServiceListWithData />
          <Footer />
        </TranslateProvider>
      </ThemeProvider>
    )
  }
}
