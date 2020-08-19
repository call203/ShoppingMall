import React from 'react'
import {Icon} from 'antd';

function Footer() {
    return (
        <div style={{
            height: '80px',
            marginTop:'300px',
            display: 'flex',flexDirection: 'column', alignItems: 'center',
             justifyContent: 'center', fontSize:'0.8 rem' }}>
          <p>(주)사랑해멍냥컴퍼니 | 대표:이소연 | 전화 :010-0000-0000</p>
          <p> 서울시 OO구 OO동 OOO번길 OO-OO</p>
          <p> COPYRIGHT(C)2020 (주)사랑해멍냥컴퍼니 All right</p>
           <p> <Icon type="github"  />  <Icon type="google" />  <Icon type="instagram" /></p>
        </div>
    )
}

export default Footer
