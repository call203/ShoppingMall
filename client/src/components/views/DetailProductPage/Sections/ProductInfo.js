import React from 'react'
import { Descriptions, Badge, Button } from 'antd';

function ProductInfo(props) {


    const clickHandler=()=>{
        
    }

    return (
        <div>
            <Descriptions title="상품 정보" bordered>
                <Descriptions.Item label="가격">{props.detail.Price}</Descriptions.Item>
                <Descriptions.Item label="재고수">{props.detail.sold}</Descriptions.Item>
                <Descriptions.Item label="조회수">{props.detail.views}</Descriptions.Item>
                <Descriptions.Item label="정보">{props.detail.description}</Descriptions.Item>   
            </Descriptions>

            <br />
            <br />
            <br />

            <div style={{display:'flex', justifyContent:'center'}}>
                <Button size='large' shape='around' type='danger' onClick={clickHandler}>
                    장바구니 넣기
                </Button>
            </div>

        
        </div>
    )
}

export default ProductInfo
