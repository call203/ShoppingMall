import React,{useState} from 'react'
import { Button, Form, Input} from 'antd';
import Axios from 'axios';



function FAQWrite(props) {

    const { TextArea } = Input;

    const Continents=[
    
        {key:1, value:"전체"},
        {key:2, value:"결제/배송"},
        {key:3, value:"교환/반품/환불"},
        {key:4, value:"마일리지 적립"},
        {key:5, value:"제품문의"},
    
    ]

    const [Question, setQuestion] = useState("")
    const [Answer, setAnswer] = useState("")
    const [Continent, setContinent] = useState(1)

    const questionHandler=(event)=>{
        setQuestion(event.currentTarget.value)
    }

    const answerHandler=(event)=>{
        setAnswer(event.currentTarget.value)
    }

    const ContinentsChangeHandler=(event)=>{
        setContinent(event.currentTarget.value)
    }

     /*FAQ 저장*/
    const submitHandler=(event)=>{
        

            event.preventDefault(); //refresh 막기위해
            if(!Question|| !Answer ||  !Continent){
                return alert("모든 칸을 다 채워주세요!")
            }
            
            const body={
                //로그인된 사람의 아이디
                writer: props.user.userData._id,
                Question:Question,
                Answer:Answer,
                Continent:Continent
            }
            Axios.post('/api/service/faq/write',body).then(response=>{
                if(response.data.success){
                    alert("FQA 업데이트 성공!")

                    props.history.push('/service/faq')
                }else{
                    alert("FQA 업데이트 실패..")
                }
        })

    }

    
    return (
        <div style={{maxWidth:'700px', margin:' 2rem auto'}}>
        <div style={{textAlign:'center', marginBottom:' 2rem'}}>
            <h2>FQA 업로드</h2>            
        </div>



        <Form >

            <label>질문</label>
            <Input  onChange={questionHandler} value ={Question} placeholder="question"/>
            <br />
            <br />

            <label>답변</label>
            <TextArea
                value={Answer}
                onChange={answerHandler}
                placeholder="answer"
                autoSize={{ minRows: 10, maxRows: 15 }}
            />
            <br />
            <br />

            <select onChange={ContinentsChangeHandler} value={Continent}>
                {Continents.map(item =>(
                    <option key={item.key} value={item.value}> {item.value} </option>
                ))}
                
            </select>
            
            <br />
            <br />
            
            <Button onClick={submitHandler}>올리기</Button>
        
        </Form>
    </div>
    )
}

export default FAQWrite