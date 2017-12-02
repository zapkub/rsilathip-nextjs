import * as React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'
import { injectGlobal, ServerStyleSheet } from 'styled-components'

injectGlobal`
.Typist .Cursor {
  display: inline-block; }
  .Typist .Cursor--blinking {
    opacity: 1;
    animation: blink 1s linear infinite; }

@keyframes blink {
  0% {
    opacity: 1; }
  50% {
    opacity: 0; }
  100% {
    opacity: 1; } }

  @font-face {
      font-family: 'slick';
      font-weight: normal;
      font-style: normal;
      src: url('/static/slick.eot');
      src: url('/static/slick.eot?#iefix') format('embedded-opentype'), url('/static/slick.woff') format('woff'), url('/static/slick.ttf') format('truetype'), url('/static/slick.svg#slick') format('svg');
  }
  body {
    margin: 0;
    padding: 0;
    color: #333;
    font-family: Helvetica, Arial, Thonburi, Tahoma;
  }
`
export default class MyDocument extends Document {
  render() {
    const sheet = new ServerStyleSheet()
    const main = sheet.collectStyles(<Main />)
    const styleTags = sheet.getStyleElement()
    return (
      <html>
        <Head>
          <link rel="stylesheet" href="/static/carousel.css" />
          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
          />
          <meta property="og:title" content="บริษัท รุ่งเรืองศิลาทิพย์" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="http://www.rsilathip.com" />
          <meta
            property="og:image"
            content="http://www.rsilathip.com/assets/og-image2.jpg"
          />
          <meta property="og:site_name" content="silathip.com" />
          <meta
            property="og:description"
            content="จำหน่าย หินแกรนิตปูพื้น รับงานแกะสลักหินแกรนิต ปีก-ส่ง ครกหิน และผลิตภัณฑ์จากหินแกรนิต."
          />

          {styleTags}
        </Head>
        <body>
          <div id="fb-root" />
          <div className="fb-customerchat" page_id="1812759359005147" />
          <div className="root">{main}</div>
          <NextScript />
          <script src="https://maps.googleapis.com/maps/api/js?sensor=false" />
          <script
            async
            dangerouslySetInnerHTML={{
              __html: `
            window.fbAsyncInit = function() {
              FB.init({
                appId            : '1574036846247049',
                autoLogAppEvents : true,
                xfbml            : true,
                version          : 'v2.11'
              });
              document.dispatchEvent(new Event('fb_init'));
            };

            (function(d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s); js.id = id;
                js.src = 'https://connect.facebook.net/en_US/sdk.js';
                fjs.parentNode.insertBefore(js, fjs);
              }(document, 'script', 'facebook-jssdk'));
          `
            }}
          />
        </body>
      </html>
    )
  }
}
