import styled, { injectGlobal } from 'styled-components'
import * as React from 'react'

injectGlobal`
footer {
    background-color: #4d4d4d;
    font-family: Thonburi,Tahoma;
    color: white;
    border-top: #d6d7d8 1px solid;
    padding: 20px;
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
const html = `
<footer>
<div class="row">
<div class="small-12 large-4 columns">
    <div class="copyright">
        2016 Rung Reang Silathip Co. All Rights Reserved
        <div class="desc">
            9/76 M.3 T.samed A.muang Chonburi 20000
            <br />Original Angsila’s mortar since 1957
        </div>

    </div>
</div>
<div class="small-12 large-4 columns">
    <div class="orderMore-box">
        <div class="wrap-text">

            <div class="desc-text">
                {{$content.end[$lang]}}
                <li><i class="fi fi-telephone"></i> 089-938-6866</li>
                <li><i class="fi fi-mail"></i> silathip2013@gmail.com</li>
            </div>

        </div>



    </div>
</div>
<div class="small-12 large-4 columns" >
    <div class="social">
        <span>
            <a href="facebook.com/r.silathip"><i class="fi-social-facebook"></i></a>
            <i class="fi-social-pinterest"></i>
            <i class="fi-social-twitter"></i>
        </span>

    </div>
</div>
</div>
</footer>
`
export default () => <div dangerouslySetInnerHTML={{ __html: html }} />
