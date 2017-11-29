import * as React from 'react'
import * as propsTypes from 'prop-types'
import SilaLogo from './SilathipLogo'
import styled from 'styled-components'
import Link from 'next/link'
import withDict from '../lib/withDict'

const Container = styled.div`
  top: 0;
  left: 0;
  right: 0;
  position: fixed;
  z-index: 2;
  background: rgba(255, 255, 255, 0.96);
  border-bottom: 1px solid #bcbcbc;
  box-shadow: 0px 3px 13px rgba(0, 0, 0, 0.15);
`
const Wrapper = styled.div`
  height: 90px;
  margin: auto;
  display: flex;
  align-items: center;
  max-width: 880px;
  padding: 0 10px;
`
const LogoWithFlex = styled(SilaLogo)`
  flex: 0 0 auto;
  margin: 0 12px;
`

const NavigationMenuWrapped = styled.div`
  flex: 1 1 auto;
  margin-left: 12px;
  display: flex;
  justify-content: space-around;
  a {
    text-decoration: none;
    color: #333;
    &:hover {
      opacity: 0.8;
    }
  }
`

const LangContainer = styled.div`
  display: flex;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 0.8em;
  .TH {
    border-radius: 5px 0 0 5px;
  }
  .EN {
    border-radius: 0 5px 5px 0;
  }
  .TH,
  .EN {
    padding: 4px 4px;
    background: #d6d7d8;
    box-shadow: inset 0px 0px 1px grey;
    &.active {
      box-shadow: none;
      background: #282c34;
      color: white;
    }
  }
`

const LanguageSwitcher = (props: { lang: string }, context) => {
  return (
    <LangContainer
      onClick={() => context.setLocale(props.lang === 'en' ? 'th' : 'en')}
    >
      <div className={'TH ' + (props.lang === 'th' ? 'active' : '')}>
        {'TH'}
      </div>
      <div className={'EN ' + (props.lang === 'en' ? 'active' : '')}>
        {'EN'}
      </div>
    </LangContainer>
  )
}
;(LanguageSwitcher as any).contextTypes = {
  setLocale: propsTypes.func
}
interface MenubarPropTypes extends WithDictPropTypes {}
export default withDict((props: MenubarPropTypes) => {
  return (
    <Container>
      <Wrapper>
        <LogoWithFlex />
        <NavigationMenuWrapped>
          <Link href={'/'}>
            <a>{props.t('about-us')}</a>
          </Link>
          <Link href={'/'}>
            <a>{props.t('product')}</a>
          </Link>
          <Link href={'/'}>
            <a>{props.t('contact-us')}</a>
          </Link>
        </NavigationMenuWrapped>
        <LanguageSwitcher lang={props.locale} />
      </Wrapper>
    </Container>
  )
})
