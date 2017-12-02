import * as React from 'react'
import styled from 'styled-components'
import Viewport from './common/Viewport'
import { One } from './common/Header'

const Container = styled.div`
  padding-top: 38px;
  padding-bottom: 38px;
`

export default () => {
  return (
    <Container>
      <Viewport style={{ textAlign: 'center' }}>
        <One>{'See us in'}</One>
        <br />
        <a target='_blank' href="https://www.facebook.com/r.silathip/photos/a.820010554693599.1073741827.819990041362317/1748171938544118/?type=3&theater">
          <img src="/static/images/baanlaesuan_logo.png" width="300" />
        </a>
      </Viewport>
    </Container>
  )
}
