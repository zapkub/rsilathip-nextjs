import * as React from 'react'
import styled, { injectGlobal } from 'styled-components'
import Carousel from 'react-img-carousel'

injectGlobal`
  .carousel .carousel-arrow { border: none !important; background: none !important; }
  .carousel-container-inner { margin: 0 !important; }
  .carousel .carousel-dots li { width: 25px!important; }
  .carousel .carousel-dots { bottom: 40px!important; }
  .carousel .carousel-dots button  { font-size: 34px !important; color: white !important; }
  #banners .carousel-dots button { color: #f7f7f7 !important; }
  #banners .carousel .carousel-dots button.selected { color: #333 !important; }
  .carousel .carousel-dots button.selected { color: #333 !important; }
  .carousel .carousel-right-arrow:before, .carousel .carousel-left-arrow:before { font-size: 34px !important; }
  .carousel .carousel-right-arrow:before { font-family: slick; content: '→' !important; }
  .carousel .carousel-left-arrow:before {  font-family: slick; content: '←' !important; }
  @media (pointer: coarse) {
    .carousel .carousel-right-arrow, .carousel .carousel-left-arrow {
      display: none;
    }
  }
`
const Container = styled.div`
  height: 100vh;
  overflow: hidden;
`
const HeroBannerItem = styled.div`
  max-width: 1920px;
  width: 100vw;
  height: 100vh;
  min-height: 400px;
  background-size: cover;
  background-position: center center;
`
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000
}
type HeroImagePropTypes = { results?: { data: string[] } }

const HeroImageSlider: React.SFC<HeroImagePropTypes> = ({ results }) => {
  const HeroList = results.data || []
  return (
    <Container>
      {HeroList.length > 0 ? (
        <Carousel style={{}} cellPadding={0}>
          {HeroList.map((url, key) => {
            return (
              <HeroBannerItem
                key={key}
                style={{ backgroundImage: `url(${url})` }}
              />
            )
          })}
        </Carousel>
      ) : null}
    </Container>
  )
}
export default HeroImageSlider
