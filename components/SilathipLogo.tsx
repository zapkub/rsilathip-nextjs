import styled from 'styled-components'
import * as React from 'react'
import { compose } from 'recompose'
import withDict from '../lib/withDict'
import * as Header from './common/Header'
import breakpoint from 'styled-components-breakpoint'

interface LogoPropTypes extends WithDictPropTypes {
  className: any
  style: any
}
const LogoContainer = styled.div`

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

const Logo: React.SFC<LogoPropTypes> = (props: LogoPropTypes) => (
  <LogoContainer className={props.className} style={props.style}>
    <Header.One>{props.t('company-title')}</Header.One>
    {props.t('company-description')}
  </LogoContainer>
)

export default compose(withDict)(Logo)
