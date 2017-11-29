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
          {styleTags}
        </Head>
        <body>
          <div className="root">{main}</div>
          <NextScript />
          <script src="https://maps.googleapis.com/maps/api/js?sensor=false" />
        </body>
      </html>
    )
  }
}
