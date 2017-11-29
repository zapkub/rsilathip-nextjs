import * as React from 'react'
import styled from 'styled-components'
import Viewport from './common/Viewport'
import * as Header from './common/Header'
import objectPath from 'object-path'

const ServiceListViewport = styled(Viewport)`
  max-width: 1024px;
  display: flex;
  p {
    margin: 0;
  }
`
type Service = {
  id: any
  content: any
  wps_subtitle: string
  image: string
}

const ServiceItemWrap = styled.div`
  flex: 0 0 33.3333333%;
  box-sizing: border-box;
  padding: 18px;
`
const ServiceDescription = styled.div``
const ServiceItem: React.SFC<Service> = props => {
  return (
    <ServiceItemWrap>
      <img
        style={{ margin: 'auto' }}
        alt={props.wps_subtitle}
        width="100"
        src={props.image}
      />
      <Header.Two>{props.wps_subtitle}</Header.Two>
      <ServiceDescription
        dangerouslySetInnerHTML={{ __html: props.content.rendered }}
      />
    </ServiceItemWrap>
  )
}

const ServiceListContainer = styled.div`
  background-image: url('/static/images/aboutus/bg-granite.jpg');
  min-height: 450px;
`
interface ServicesPropTypes {
  services: Service[]
}
const Services: React.SFC<ServicesPropTypes> = props => {
  console.log(props)
  return (
    <ServiceListContainer>
      <ServiceListViewport>
        {props.services.map(service => (
          <ServiceItem key={service.id} {...service} />
        ))}
      </ServiceListViewport>
    </ServiceListContainer>
  )
}
Services.displayName = 'ServiceItemList'
export default Services
