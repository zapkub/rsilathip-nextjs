import * as React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import Viewport from './common/Viewport'
import * as Header from './common/Header'
import withDict from '../lib/withDict'

const BlogListContainer = styled.div`
  padding: 38px 8px;
`
const Excerpt = styled.div`
  p {
    display: block;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    overflow: hidden;
    word-break: break-all;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
  }
`
const BlogItemWrap = styled.div`
  margin: 0 0 28px 0;
  padding-bottom: 18px;
  border-bottom: 1px solid #ddd;
`
const BlogItem: React.SFC<Blog & { t?: (w: string) => string }> = withDict(
  props => {
    return (
      <BlogItemWrap>
        <Header.Two
          dangerouslySetInnerHTML={{ __html: props.title.rendered }}
        />
        <Header.Three
          style={{ color: '#bcbcbc' }}
          dangerouslySetInnerHTML={{ __html: props.wps_subtitle }}
        />
        <Excerpt
          dangerouslySetInnerHTML={{
            __html: props.excerpt.rendered
          }}
        />
        <Link href="/">
          <a>{props.t('read-more')}</a>
        </Link>
      </BlogItemWrap>
    )
  }
)

interface Blog {
  content: {
    rendered: string
  }
  excerpt: {
    rendered: string
  }
  id: any
  title: {
    rendered: string
  }
  wps_subtitle: string
}
interface BlogListPropTypes {
  blogs: Blog[]
  t: (w: string) => string
}
const BlogList: React.SFC<BlogListPropTypes> = props => {
  console.log(props)
  return (
    <Viewport style={{ maxWidth: 880 }}>
      <BlogListContainer>
        {props.blogs.map(blog => {
          return <BlogItem key={blog.id} {...blog} />
        })}
      </BlogListContainer>
    </Viewport>
  )
}

export default withDict(BlogList)
