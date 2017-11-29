import styled from 'styled-components'
import * as React from 'react'
import { compose } from 'recompose'
import withDict from '../lib/withDict'
import * as Header from './common/Header'

interface LogoPropTypes extends WithDictPropTypes {
  className: any
  style: any
}
const LogoContainer = styled.div``

const Logo: React.SFC<LogoPropTypes> = (props: LogoPropTypes) => (
  <LogoContainer className={props.className} style={props.style}>
    <Header.One>{props.t('company-title')}</Header.One>
    {props.t('company-description')}
  </LogoContainer>
)

export default compose(withDict)(Logo)
