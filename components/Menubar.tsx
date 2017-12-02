import * as React from 'react'
import * as propsTypes from 'prop-types'
import SilaLogo from './SilathipLogo'
import styled from 'styled-components'
import { compose, withState } from 'recompose'
import breakpoint from 'styled-components-breakpoint'
import Link from 'next/link'
import withDict from '../lib/withDict'

const Container = styled.div`
  top: 0;
  left: 0;
  right: 0;
  position: fixed;
  z-index: 3;
  background: rgba(255, 255, 255, 0.96);
  border-bottom: 1px solid #bcbcbc;
  box-shadow: 1px 3px 13px rgba(0, 0, 0, 0.15);
  a {
    text-decoration: none;
  }
`
const MobileMenuToggle = styled.div`
  width: 30px;
  flex: 0 0 30px;
  font-size: 1.7rem;
  text-align: center;
  cursor: pointer;
  ${breakpoint('mobile')`
    display: block;
  `} ${breakpoint('tablet')`
    display: none;
  `};
`
const MobileMenuClose = styled.div`
  cursor: pointer;
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 2.7rem;
`
const MobileMenubar: React.SFC<{ isActive: boolean }> = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 0 13px;
  background: white;
  display: ${(props: { isActive: boolean; theme: any }) =>
    props.isActive ? 'flex' : 'none'};
  flex-direction: column;
  align-items: center;
  justify-content: center;

  a {
    display: block;
    font-weight: bold;
    text-align: center;
    cursor: pointer;
    padding: 24px 0;
    font-size: 2.5rem;
    text-decoration: none;
    color: ${props => props.theme.black};
    &.active {
      font-weight: bold;
    }
    &:hover {
      opacity: 0.8;
    }
  }
` as any

const Wrapper = styled.div`
  margin: auto;
  display: flex;
  align-items: center;
  max-width: 880px;
  padding: 0 10px;
  ${breakpoint('mobile')`
    .logo-flex{
      flex: 1 0 auto;
    }
    height: 60px;
  `} ${breakpoint('tablet')`
    height: 90px;
    .logo-flex {
      flex: 0 0 auto;
    }
  `};
`
const LogoWithFlex = styled(SilaLogo)`
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
  margin: 0 12px;
  color: ${props => props.theme.black};
  ${breakpoint('mobile')`
    font-size: 0.8rem;
    h1 {
      font-size: 1rem;
    }
  `};
  ${breakpoint('tablet')`
    flex: 0 0 auto;
    h1 {
      font-size: 1.8em;
    }
    font-size: 1rem;
  `};
`

const NavigationMenuWrapped = styled.div`
  flex: 1 1 auto;
  margin-left: 12px;
  display: flex;
  justify-content: space-around;
  a {
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
  ${breakpoint('mobile')`
    display: none;
  `} ${breakpoint('tablet')`
    display: flex;
  `};
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

export const LanguageSwitcher = (props: { lang: string }, context) => {
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
interface MenubarPropTypes extends WithDictPropTypes {
  isShowMobileMenu: boolean
  active: string
  setShowMobileMenu: (isShow: boolean) => void
}
const MenubarComponent: React.SFC<MenubarPropTypes> = (
  props: MenubarPropTypes
) => {
  return (
    <Container>
      <Wrapper>
        <MobileMenuToggle onClick={() => props.setShowMobileMenu(true)}>
          <i className="fa fa-bars" />
        </MobileMenuToggle>
        <Link href={'/'}>
          <a className='logo-flex'>
            <LogoWithFlex />
          </a>
        </Link>
        <NavigationMenuWrapped>
          <Link href={'/'}>
            <a className={props.active === '/' ? 'active' : ''}>{props.t('about-us')}</a>
          </Link>
          <Link href={'/products'}>
            <a className={props.active === 'products' ? 'active' : ''} >{props.t('product')}</a>
          </Link>
          <Link href={'/contact-us'}>
            <a className={props.active === 'contact-us' ? 'active' : ''}>{props.t('contact-us')}</a>
          </Link>
        </NavigationMenuWrapped>
        <LanguageSwitcher lang={props.locale} />
      </Wrapper>

      <MobileMenubar isActive={props.isShowMobileMenu}>
        <MobileMenuClose onClick={() => props.setShowMobileMenu(false)}>
          <i className="fa fa-close" />
        </MobileMenuClose>
        <Link href={'/'}>
          <a>{props.t('about-us')}</a>
        </Link>
        <Link href={'/products'}>
          <a>{props.t('product')}</a>
        </Link>
        <Link href={'/contact-us'}>
          <a>{props.t('contact-us')}</a>
        </Link>
      </MobileMenubar>
    </Container>
  )
}
export default compose<{}, { active: string }>(
  withDict,
  withState('isShowMobileMenu', 'setShowMobileMenu', false)
)(MenubarComponent)
