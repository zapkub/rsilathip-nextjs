import styled from 'styled-components'
import * as React from 'react'
import bp from 'styled-components-breakpoint'

export default styled.div`
  max-width: 1280px;
  margin: 0 auto;
  ${bp('mobile')`
    padding: 0 18px;
  `} ${bp('tablet')`
    padding: 0 15px;
  `};
`
