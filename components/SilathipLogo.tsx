import styled from 'styled-components'
import * as React from 'react'
import { compose } from 'recompose'
import withDict from '../lib/withDict'
import * as Header from './common/Header'

interface LogoPropTypes extends WithDictPropTypes {}
const LogoContainer = styled.div``

export default compose(withDict)((props: LogoPropTypes) => (
  <LogoContainer>
    <Header.One>{props.t('company-title')}</Header.One>
    {props.t('company-description')}
  </LogoContainer>
))
