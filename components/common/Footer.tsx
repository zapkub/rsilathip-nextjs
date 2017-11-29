import styled, { injectGlobal } from 'styled-components'
import * as React from 'react'
import { compose } from 'recompose'
import Viewport from './Viewport'
import withPromise from '../../lib/withPromises'
import config from '../../config'
import withDict from '../../lib/withDict'

injectGlobal`
.footer {
    background-color: #4d4d4d;
    font-family: Thonburi,Tahoma;
    color: white;
    border-top: #d6d7d8 1px solid;
    padding: 20px;
    font-size: 0.8em;
    a {
        color: white;
        &.mail {
            // text-decoration: underline;
        }
        &:hover {
          opacity: 0.8;
        }
    }

    .copyright::before {
        font-size: 18px;
        content: '© ';
    }
    .copyright {
        text-align: left;
        font-size: 15px;
        .desc {
            font-size: 12px;
        }
    }
    @media screen and (max-width: 1024px) {
        .copyright {
            text-align: center;
            font-size: 15px;
            .desc {
                font-size: 12px;
            }
        }
    }
    .social {
        width: 100%;
        text-align: center;
        font-size: 50px;
    }
    .orderMore-box {
        display: flex;
        justify-content: center;
        width: 100%;
        .wrap-text {
            display: flex;
            align-content: center;
            justify-content: center;
            flex-direction: row;
            width: 500px;
            .desc-text {
                text-align: left;
                color: white;
                font-size: 15px;
                li {
                  list-style: none;
                    font-size: 15px;
                    font-weight: bolder;
                }

            }

        }
    }
    @media screen and (max-width: 1024px) {
        .orderMore-box {
          margin: 20px;
          text-align: center;
        }
        .wrap-text{
          text-align: center;
        }
        li{
          text-align: center;
        }
    }
}
`

const Footer: React.SFC<{ results: any }> = props => {
  return <div className='footer' dangerouslySetInnerHTML={{ __html: props.results.data }} />
}
export default compose(
  withDict,
  withPromise(props => ({
    data: config.getFooterData(props.locale)
  }))
)(Footer)
