import * as React from 'react'
import TranslateProvider from '../lib/TranslateProvider'
import styled, { ThemeProvider, injectGlobal } from 'styled-components'
import Logo from '../components/SilathipLogo'
import Link from 'next/link'
import Menubar from '../components/Menubar'
import theme from '../theme'
import Footer from '../components/common/Footer'
import config from '../config'
import withPromises from '../lib/withPromises'
import objectPath from 'object-path'
import Router from 'next/router'
import BlogReader from '../components/BlogReader'
import withDict from '../lib/withDict'
import { withProps, compose } from 'recompose'
injectGlobal`

  a.logo-link {
    text-decoration: none;
    color: #333;
    font-weight: 100;
    &:hover {
      opacity: 0.8;
    }
    &.active {
      font-weight: bold;
    }
  }
`

const CenterLogo = styled(Logo)`
  padding-top: 10px;
  margin: 0 auto;
  padding-bottom: 10px;
  text-align: center;
`
const BlogContainer = styled.section`
  border-top: 1px solid #eee;
  padding-top: 38px;
  min-height: 100vh;
`

const BlogReaderWithData = compose<{ blog: any }, { id: any }>(
  withPromises(props => ({
    blog: config.getBlog(props.id)
  })),
  withProps<{}, any>(props => ({
    blog: objectPath(props).get('results.blog'),
    loading: props.loading
  }))
)(BlogReader)

export default class BlogPage extends React.Component<{ url: any }, {}> {
  static getInitialProps() {
    return {}
  }

  componentDidMount() {}

  render() {
    if (typeof window !== 'undefined') {
      if (window.location.search) {
        const id = window.location.search.replace('?id=', '')
        return (
          <ThemeProvider theme={theme}>
            <TranslateProvider>
              <Link href={'/'}>
                <a className="logo-link">
                  <CenterLogo />
                </a>
              </Link>
              <BlogContainer>
                {typeof window !== 'undefined' ? (
                  <BlogReaderWithData id={id} />
                ) : null}
              </BlogContainer>
              <div />
              <Footer />
            </TranslateProvider>
          </ThemeProvider>
        )
      }
    } else {
      return <div />
    }
  }
}
