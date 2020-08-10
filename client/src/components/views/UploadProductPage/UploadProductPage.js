import React,{useState} from 'react'
import {Typography, Button, Form, Input} from 'antd';
import  FileUpload  from '../../utils/FileUpload';
import Axios from 'axios';
const { Title } = Typography;
const { TextArea} = Input;
const Continents=[

    {key:1, value:"채소 & 과일"},
    {key:2, value:"수산물"},
    {key:3, value:"정육 & 계란 & 우유"},
    {key:4, value:"간편식"},
    {key:5, value:"베이커리"},
    {key:6, value:"반려동물"},
    {key:7, value:"기타"}

]



function UploadProductPage(props) {
    const [Title, setTitle] = useState()
    const [Price, setPrice] = useState(0)
    const [Description, setDescription] = useState()
    const [Continent, setContinent] = useState(1)
    const [Images, setImages] = useState([])



    const titleChangeHandler = (event)=>{
        setTitle(event.currentTarget.value)
    }

    const priceChangHandler = (event)=>{
        setPrice(event.currentTarget.value)
    }

    const descChangHandler = (event)=>{
        setDescription(event.currentTarget.value)
    }

    const ContinentsChangeHandler = (event)=>{
        setContinent(event.currentTarget.value)
    }

    const updateImages=(newImages)=>{
        setImages(newImages)
    }

    const submitHandler=(event)=>{
        event.preventDefault(); //refresh 막기위해
        if(!Title|| !Description || !Price || !Continent || !Images){
            return alert("모든 칸을 다 채워주세요!")
        }

        const body={
            //로그인된 사람의 아이디
            writer: props.user.userData._id,
            title:Title,
            description:Description,
            Price:Price,
            images:Images,
            Continenets:Continent
        }

        Axios.post('/api/product',body).then(response=>{
            if(response.data.success){
                alert("상품 업로드에 성공하였습니다.")
                props.history.push('/')
            
            }else{
                 alert("상품 업로드에 실패하였습니다. ") 
            }    
        })
    }



    return (
       <div style={{maxWidth:'700px', margin:' 2rem auto'}}>
            <div style={{textAlign:'center', marginBottom:' 2rem'}}>
                <h2>상품 업로드</h2>            
            </div>



            <Form onSubmit={submitHandler}>

                <FileUpload refreshFunction={updateImages}/>

                <br />
                <br />

                <label>이름</label>
                <Input onChange={titleChangeHandler} value={Title}  placeholder="상품명"/>
                <br />
                <br />

                <label>가격</label>
                <Input onChange={priceChangHandler} value={Price}/>
                <br />
                <br />

                <label>설명</label>
                <TextArea onChange={descChangHandler} value={Description} placeholder="상품을 설명해주세요"/>

                <br />
                <br />

                <select onChange={ContinentsChangeHandler} value={Continent}>
                    {Continents.map(item =>(
                        <option key={item.key} value={item.value}> {item.value} </option>
                    ))}
                    
                </select>
                
                <br />
                <br />
                
                <Button onClick={submitHandler}>확인</Button>
            
            </Form>
        </div>
    )
}

export default UploadProductPage
