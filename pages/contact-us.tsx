import * as React from 'react'
import TranslateProvider from '../lib/TranslateProvider'
import styled, { ThemeProvider, injectGlobal } from 'styled-components'
import Menubar from '../components/Menubar'
import theme from '../theme'
import Footer from '../components/common/Footer'
injectGlobal`
  .center-detail {
      .title {
        font-weight: bold;
        font-size:24px;
      }
      p {
        font-size: 14px;
      }
  }

`
declare global {
  var google: any
}

const mapCenter = {
  lat: 13.330933,
  lng: 100.93822
}
function initMap() {
  const mapDiv = document.getElementById('map')
  const map = new google.maps.Map(mapDiv, {
    center: mapCenter,
    zoom: 17,
    disableDefaultUI: true
  })
  const marker = new google.maps.Marker({
    position: {
      lat: 13.329133,
      lng: 100.93814
    },
    map: map
  })
  const infowindow = new google.maps.InfoWindow({
    content: `
      <div class="center-detail" id="detail">
        <div class="title">
          บริษัท รุ่งเรืองศิลาทิพย์
        </div>
        <p>
            <i class="fa fa-map-pin"></i>
              9/76 หมู่ 3 ตำบล เสม็ด อำเภอ เมือง จังหวัด ชลบุรี 20000
              <br>
              <i class="fa fa-map-pin"></i> 9/76 M.3 T.samed A.muang Chonburi 20000
          <br>
            <i class="fa fa-phone"></i> 089-938-6866
          <br>
            <i class="fa fa-envelope"></i> Silathip2013@gmail.com
        </p>
      </div>
      `
  })
  infowindow.open(map, marker)
  // google.maps.event.addListener(infowindow, 'domready', function(){
  //   let detail = document.getElementById('detail');
  //   $log.log(detail);
  //   $compile(detail)($scope);
  //   $scope.$apply();
  // })
  window.addEventListener('resize', function() {
    map.setCenter(mapCenter)
  })
}

export default class ContactUs extends React.Component {
  componentDidMount() {
    if (typeof window !== 'undefined') {
      initMap()
    }
  }
  render() {
    return (
      <ThemeProvider theme={theme}>
        <TranslateProvider>
          <Menubar active='contact-us' />
          <div id="map" style={{ pointerEvents: 'none', width: '100vw', height: '100vh' }} />
          <Footer />
        </TranslateProvider>
      </ThemeProvider>
    )
  }
}
