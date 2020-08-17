import React,{useEffect, useState} from 'react'
import { FaCode, FaWeight } from "react-icons/fa";
import axios from "axios";
import {Button, List, Table, Icon} from 'antd'
import { DownOutlined } from '@ant-design/icons';

function FAQPage() {


    
    useEffect(()=>{

        getFAQ()
        
    },[])
    const columns = [
        {
          title: '번호',
          dataIndex: 'num',
        },
        {
          title: '분류',
          dataIndex: 'category',
        },
        {
          title: '내용',
          dataIndex: 'content',
        },
      ];

      const [data, setdata] = useState([])
      const [Detail, setDetail] = useState([])

      const getFAQ = ()=>{

            axios.post('/api/service/faq/getboard').then(response=>{
              
                let li1=[]
                for(let i=0; i<response.data.boardSize; i++){
                    let DataDic = {}
                    DataDic['key'] = i+1
                    DataDic['num'] = i+1
                    DataDic['category'] = response.data.Info[i].Continent
                    DataDic['content'] = response.data.Info[i].Question
                    DataDic['answer'] = response.data.Info[i].Answer
                    li1.push(DataDic)
                   // data.push(DataDic)
                   
                }

                setdata(li1)
                console.log(data)
                

            })

      }
      // const detailHandler=()=>{
      //       response.data.Info.map((detail,index)=>{
                    
      //         setDetail(detail.Answer)
      //         console.log(Detail)
      //       })
      // }

      
    return (
        <div>

            <div style={{width:"75%", margin:'3rem auto'}}>              
                <h2>FQA</h2>         
                <Table
                  columns={columns}
                  expandedRowRender={record => <p style={{ margin: 0 }}>{record.answer}</p>}
                  expandableRowIcon={<Icon type="right" />}
                  collapsedRowIcon={<Icon type="down" />}
                  dataSource={data}
                />
                  <div>
                  {/*<Button onClick={writeHandler()} style={{marginLeft:"90%", marginTop:"20px"}}>글쓰기</Button>*/}
                  </div>

              </div>

              
            </div>
        
    )
}

export default FAQPage