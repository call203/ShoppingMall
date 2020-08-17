import React,{useState} from 'react'
import {Input} from 'antd'
import { set } from 'mongoose';
function SearchFeature(props) {
    const { Search } = Input;
    const [SearchTerm, setSearchTerm] = useState("")

    const searchHandler=(event)=>{
        setSearchTerm(event.currentTarget.value)
        props.refreshFunction(event.currentTarget.value)
    }



    return (
        <div>
             <Search
                placeholder="상품 검색"
                onChange={searchHandler}
                style={{ width: 200 }}
                value={SearchTerm}
                />
        </div>
    )
}

export default SearchFeature
