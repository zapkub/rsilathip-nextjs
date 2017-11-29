import * as React from 'react'
import Spinner from './common/Spinner'
import ProgressiveImage from 'react-progressive-image-loading'
import { compose, withState, withProps } from 'recompose'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import Carousel from 'react-img-carousel'
import Lightbox from 'react-images'

const FullGalleryContainer = styled.div`
  display: block;
  z-index: 10;
`
const LoadmoreButton = styled.button`
  cursor: pointer;
  color: grey;
  margin: 15px auto;
  display: block;
  width: 200px;
  padding: 10px 20px;
  text-align: center;
  background: #f7f7f7;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.2);
  &:disabled {
    box-shadow: 0 0 0 rgba(0, 0, 0, 0);
    opacity: 0.8;
  }
`

interface ProductGalleryPropTypes {
  onGalleryNext: () => void
  onGalleryPrev: () => void
  currentImage: number
  setCurrentImage: (index: number) => number
  isShowFullGallery: boolean
  loading: boolean
  setIsShowFullGallery: (b: boolean) => boolean
  isEnd?: boolean
  gallery?: {
    title: string
    imageUrl: string
    thumbnailImageUrl: string
    caption: string
    id: any
  }[]
  loadmoreGallery?: () => void
}

const FloatListContainer = styled.div`
  position: relative;
  &:after {
    content: ' ';
    display: block;
    clear: both;
  }
`

const ImageItem = styled.div`
  position: relative;
  background-size: cover;
  background-position: center center;
  float: left;
  &:before {
    display: block;
    content: ' ';
    padding-top: 100%;
  }

  ${breakpoint('mobile')`
    width: 50%;
  `} ${breakpoint('tablet')`
    width: 33.3333333%;
  `};
`

const GalleryFullViewItem = styled.div`
  width: 1280px;
  img {
    width: 300px;
  }
`

const GalleryImage: React.SFC<ProductGalleryPropTypes> = props => {
  if (props.loading) {
    return <Spinner />
  }
  return (
    <div>
      <FloatListContainer key={'images'}>
        {props.gallery.map((item, index) => (
          <ProgressiveImage
            key={item.id}
            preview={item.thumbnailImageUrl}
            src={item.imageUrl}
            render={(src, style) => (
              <ImageItem
                onClick={() => {
                  props.setCurrentImage(index)
                  props.setIsShowFullGallery(true)
                }}
                key={item.id}
                style={{ ...style, backgroundImage: `url(${src})` }}
              />
            )}
          />
        ))}
      </FloatListContainer>
      <LoadmoreButton
        disabled={props.isEnd}
        key="loadmore-button"
        onClick={() => props.loadmoreGallery()}
      >
        {props.isEnd ? 'End of gallery' : 'Load more'}
      </LoadmoreButton>
      <Lightbox
        currentImage={props.currentImage}
        images={props.gallery.map(image => ({ src: image.imageUrl }))}
        isOpen={props.isShowFullGallery}
        onClickPrev={props.onGalleryPrev}
        onClickNext={props.onGalleryNext}
        onClose={() => props.setIsShowFullGallery(false)}
      />
    </div>
  )
}

GalleryImage.displayName = 'gallery'
export default compose(
  withState('isShowFullGallery', 'setIsShowFullGallery', false),
  withState('currentImage', 'setCurrentImage', 0),
  withProps<any, {}>(props => ({
    onGalleryNext: () => {
      if (props.currentImage < props.gallery.length - 1) {
        props.setCurrentImage(props.currentImage + 1)
      } else {
        props.setCurrentImage(0)
      }
    },
    onGalleryPrev: () => {
      if (props.currentImage === 0) {
        props.setCurrentImage(props.gallery.length - 1)
      } else {
        props.setCurrentImage(props.currentImage - 1)
      }
    }
  }))
)(GalleryImage)
