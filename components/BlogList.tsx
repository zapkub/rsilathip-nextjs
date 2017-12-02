import * as React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import Viewport from './common/Viewport'
import * as Header from './common/Header'
import withDict from '../lib/withDict'

const FeatureImage = styled.div`
  width: 300px;
  height: 210px;
  background-size: cover;
  background-position: center center;
  margin-bottom: 13px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  background-clip: padding-box;
`
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
  &:nth-last-child(1) {
    border-bottom: 0;
  }
`
const BlogItem: React.SFC<Blog & { t?: (w: string) => string }> = withDict(
  (props: Blog & { t: any }) => {
    return (
      <BlogItemWrap>
        <FeatureImage
          style={{
            backgroundImage: `url(${
              props.better_featured_image.media_details.sizes.medium_large
                .source_url
            })`
          }}
        />
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
        <Link href={{ pathname: `/blog`, query: { id: props.id } }}>
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
interface BlogListPropTypes {
  blogs: Blog[]
  t: (w: string) => string
}
const BlogList: React.SFC<BlogListPropTypes> = props => {
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
