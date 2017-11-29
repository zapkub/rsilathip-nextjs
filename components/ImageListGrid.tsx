import * as React from 'react'
import breakpoint from 'styled-components-breakpoint'
import styled from 'styled-components'
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`
const Item = styled.a`
  position: relative;
  background-size: cover;
  background-position: center center;
  &:before {
    display: block;
    content: ' ';
    padding-top: 100%;
  }
  ${breakpoint('mobile')`
    width: 25%;
    flex: 0 0 25%;
  `}
  ${breakpoint('tablet')`
    width: 10%;
    flex: 0 0 10%;
  `}
`

interface ImageListGrid {
  images: {
    href: string
    url: string
  }[]
}
const GridList: React.SFC<ImageListGrid> = props => {
  return (
    <Container>
      {props.images.map((image, key) => (
        <Item key={key} href={image.href} style={{ backgroundImage: `url(${image.url})` }} />
      ))}
    </Container>
  )
}
GridList.displayName = 'ImageGridList'
export default GridList
