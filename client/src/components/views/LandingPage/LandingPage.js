import React,{useEffect, useState} from 'react'
import { FaCode, FaWeight } from "react-icons/fa";
import axios from "axios";
import {Icon, Col, Card, Row, Button} from 'antd'
import Meta from 'antd/lib/card/Meta';
import ImageSlider from '../../utils/ImageSlider'
import CheckBox from './Sections/CheckBox'
import {continents, price} from './Sections/Datas'
import RadioBox from './Sections/RadioBox'
import SearchFeature from './Sections/SearchFeature'

function LandingPage() {


    const [Products, setProducts] = useState([])

    {/*더보기 버튼을 위한 usestate*/}
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(8)
    const [postSize, setPostSize] = useState(0)
    const [Filters, setFilters] = useState({
    
        Continents:[],
        Price:[]

    })
    const [SearchTerm, setSearchTerm] = useState("")

   
    /*처음 페이지가 로딩된 후 */
    useEffect(()=>{

        let body = {
            skip:Skip,
            limit:Limit
        }

        getProducts(body)
        
    },[])

    
    /*더보기 버튼을 누른 후*/
    const showmoreHandler = ()=>{

        let skip=Skip + Limit

        let body = {
            skip:skip,
            limit:Limit,
            loadMore:true
        }

        getProducts(body)
        setSkip(skip)

    }

    /*상품을 가져옴*/
    const getProducts = (body)=>{
        axios.post('/api/product/products',body).then(response =>{
            if(response.data.success){
                if(body.loadMore){
                    //원래 있는 데이터와 합치기
                    setProducts([...Products,...response.data.Info])
                }else{
                    setProducts(response.data.Info)
                }
                setPostSize(response.data.postSize)
                
            }else{
                alert(" ERROR ! 상품들을 가져오는데 실패하였습니다. ")
            }
        })
    }


    /**cardView **/
    const renderCards = Products.map((product, index)=>{

        return<Col lg={6} md={8} xs={24} key={index} >

                <Card                     
                    cover={<a href={`/product/${product._id}`}><ImageSlider images={product.images} /></a>}>
                    <Meta title={product.title}
                        description={`$${product.Price}`}/>
                </Card>

            </Col> 
        
    })
    const showFilteredResults=(filters) =>{
        let body={
            skip:0,
            limit:Limit,
            filters:filters
        }

        getProducts(body)
        setSkip(0)

    }

    const handlePrice=(value)=>{
        const data = price;
        let array =[];

        for(let key in data){
            if(data[key]._id === parseInt(value,10)){
                array = data[key].array;
            }
        }
        return array;
    }

    const handleFilters=(filters, category)=>{        


        const newFilters = {...Filters}

        newFilters[category] = filters

        if(category ==='Price'){
            let priceValues = handlePrice(filters)
            newFilters[category] = priceValues
        }
        showFilteredResults(newFilters)
        setFilters(newFilters)
    }

    const updateSearchTerm = (newSearchTerm) =>{

        let body={
            skip:0,
            limit:Limit,
            filters:Filters,
            searchTerm:newSearchTerm
        }
        setSkip(0)
        setSearchTerm(newSearchTerm)
        getProducts(body)
    }


    return (
        <div style={{width:"75%", margin:'3rem auto'}}>
            <div style={{textAlign:'center'}}>
                <h2 style={{marginBottom:'100px'}}>For My Dog & Cat  <Icon type='heart'/></h2>
            </div>
            
            {/*Filter*/}

            
            <Row gutter={[16,16]}>
                <Col lg={12}>
                    {/*CheckBox*/}
                    <CheckBox  list={continents} handleFilters={filters => handleFilters(filters, "Continents")}/>
                </Col>
                <Col lg={12} xs={24}>
                      {/*RadioBox*/}
                      <RadioBox list={price} handleFilters={filters => handleFilters(filters, "Price")}/>
                </Col>
            </Row>

           

            
            
            {/*Search*/}
            <div style={{display:'flex', justifyContent:'flex-end', margin:'2rem auto'}}>
                <SearchFeature
                    refreshFunction={updateSearchTerm}
                />
             </div>   
            

            {/*Card*/}
            <Row gutter={16,16}> 
                {renderCards}
            </Row>

           {/* 더보기 버튼 */}
           {/* 만약 데이터가 더 있을시에만 버튼 보여주기*/}
           {postSize >=Limit &&<div>
                <Button onClick={showmoreHandler} style={{display:'flex', justifyContent:'center', margin:'5rem auto', width:"200px" }}>더보기</Button>
            </div>
            }

            
            
        </div>
    )
}

export default LandingPage
