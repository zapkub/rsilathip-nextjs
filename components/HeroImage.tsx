import * as React from 'react'
import Spinner from './common/Spinner'
import styled, { injectGlobal } from 'styled-components'
import ProgressiveImage from 'react-progressive-image-loading'
import Carousel from 'react-img-carousel'
import Typist from 'react-typist'

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
  position: relative;
  height: 100vh;
  min-height: 400px;
  background-size: cover;
  background-position: center center;
`
const TypistContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 30px;
  z-index: 2;
  transform: translate(0, -50%);
  font-size: 3.3em;
  color: white;
  span {
    background: rgba(0, 0, 0, 0.7);
  }
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
type HeroImagePropTypes = {
  t: (w: string) => string
  results?: {
    data: { imageUrl: string; thumbnailImageUrl: string }[]
    services: { title: string }[]
  }
}

const HeroImageSlider: React.SFC<HeroImagePropTypes> = ({ results, t }) => {
  const HeroList = results.data || []
  const Services = results.services || []
  return (
    <Container>
      <TypistContainer>
        <Typist>
          <span>{t('hero-msg-1')}</span>
          <Typist.Backspace count={t('hero-msg-1').length} delay={2200} />
          <span>{t('hero-msg-2')}</span>
          <Typist.Backspace count={t('hero-msg-1').length} delay={2200} />
          <span>{t('hero-msg-3')}</span>
        </Typist>
      </TypistContainer>
      {HeroList.length > 0 ? (
        <Carousel pauseOnHover autoplay lazy transition="fade" style={{}} cellPadding={0}>
          {HeroList.map((item, key) => {
            return (
              <div key={key} >
                <ProgressiveImage
                  preview={item.thumbnailImageUrl}
                  src={item.imageUrl}
                  render={(src, style) => (
                    <HeroBannerItem
                      key={key}
                      style={{ ...style, backgroundImage: `url(${src})` }}
                    />
                  )}
                />
              </div>
            )
          })}
        </Carousel>
      ) : <Spinner />}
    </Container>
  )
}
export default HeroImageSlider
