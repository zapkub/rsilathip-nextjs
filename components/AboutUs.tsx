import * as React from 'react'
import styled, { injectGlobal } from 'styled-components'
import { compose } from 'recompose'
import withDict from '../lib/withDict'
import Viewport from './common/Viewport'
import * as Header from './common/Header'
import theme from '../theme'
injectGlobal`
  .gold {
   color: ${theme.gold};
  }
`
interface AboutUsPropTypes extends WithDictPropTypes {
  loading?: boolean
  founderHTML: string
  aboutusHTML: string
}

const TextContainer = styled.div``
const FlexContainerRow = styled.div`
  display: flex;
`
const FlexItem = styled.div`
  flex: 1 0 auto;
  width: 0;
`

const FlexPictureWrap = styled.div`
  flex: 0 0 100px;
  width: 100px;
`
const CirclePicture = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: 20px 0;
  text-align: center;
  vertical-align: middle;
  background: url('/static/images/aboutus/founder.jpg') center center;
  background-size: cover;
`

const QuoteWrapper = styled.div`
  font-size: 2em;
  padding: 38px;
  position: relative;
  line-height: 78px;
  &:before, &:after {
    display: inline-block;
    line-height: 58px;
  }
  &:before {
    font-size: 2.5em;
    content: "“";
    top: 40px;
    position: absolute;
    left: -10px;
    font-size: 60px;
}
  }
  &:after {
    font-size: 2.5em;
    content: "”";
    padding-left: 20px;
    font-size: 60px;
    right: -10px;
    bottom: 0;
  }
`

const AboutUs: React.SFC<AboutUsPropTypes> = (props) => {
  if (props.loading) return <div />
  const { founderHTML, aboutusHTML } = props
  return (
    <Viewport style={{ marginTop: 48 }}>
      <FlexContainerRow>
        <FlexPictureWrap>
          <CirclePicture />
        </FlexPictureWrap>
        <FlexItem style={{ padding: '18px 33px 0 33px' }}>
          <Header.One className={'gold'}>{props.t('about-us')}</Header.One>
          <TextContainer dangerouslySetInnerHTML={{ __html: aboutusHTML }} />
          <Header.One className={'gold'}>{props.t('founder')}</Header.One>
          <TextContainer dangerouslySetInnerHTML={{ __html: founderHTML }} />
        </FlexItem>
        <FlexItem>
          <QuoteWrapper
            dangerouslySetInnerHTML={{ __html: props.t('company-quote') }}
          />
        </FlexItem>
      </FlexContainerRow>
    </Viewport>
  )
}
AboutUs.displayName = 'about-us'

export default withDict(AboutUs)
