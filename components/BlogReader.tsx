import * as React from 'react'
import Viewport from './common/Viewport'
import Spinner from './common/Spinner'
import lifecycle from 'recompose/lifecycle'
import * as Header from './common/Header'
import styled from 'styled-components'

declare global {
  var FB: any
}

const { DateTime } = require('luxon')
const SocialPluginWrap = styled.div`
  margin: 0 0;
  max-width: 480px;
`
interface BlogReaderPropTypes {
  loading: boolean
  blog: {
    id: any
    date: string
    title: {
      rendered: string
    }
    content: {
      rendered: string
    }
    wps_subtitle: any
    better_featured_image: {
      id: any
      media_details: {
        sizes: {
          medium_large: {
            source_url: string
          }
        }
      }
    }
  }
}
const ContentContainer = styled.div``
const BlogDate = styled.div`
  color: ${props => props.theme.grey};
  font-size: 0.8em;
`
const BlogReader: React.SFC<BlogReaderPropTypes> = props => {
  if (props.loading) {
    return <Spinner />
  }
  return (
    <Viewport style={{ maxWidth: '800px' }}>
      <Header.Two
        style={{ fontSize: '2.8em' }}
        dangerouslySetInnerHTML={{ __html: props.blog.title.rendered }}
      />
      <Header.Three
        style={{ color: '#bcbcbc' }}
        dangerouslySetInnerHTML={{ __html: props.blog.wps_subtitle }}
      />
      <BlogDate>
        {DateTime.fromISO(props.blog.date).toLocaleString(
          DateTime.DATETIME_MED
        )}
      </BlogDate>
      <ContentContainer
        dangerouslySetInnerHTML={{ __html: props.blog.content.rendered }}
      />
      <SocialPluginWrap>
        <div
          className="fb-like"
          data-href={'https://www.rsilathip.com/blog?id=' + props.blog.id}
          data-width="300"
          data-layout="standard"
          data-action="like"
          data-size="small"
          data-show-faces="true"
          data-share="true"
        />
        <br />
        <div
          className="fb-comments"
          data-href={'http://www.rsilathip.com/blog?id=' + props.blog.id}
          data-numposts="5"
          data-width="100%"
        />
      </SocialPluginWrap>
    </Viewport>
  )
}
export default lifecycle({
  componentDidMount() {
    document.addEventListener('fb_init', e => FB.XFBML.parse())
  },
  componentDidUpdate(prevProps) {
    if (this.props.blog !== prevProps.blog) {
      if (typeof FB !== 'undefined') {
        FB.XFBML.parse()
      }
    }
  }
})(BlogReader)
