import React,{useEffect, useState} from 'react'
import { FaCode, FaWeight } from "react-icons/fa";
import axios from "axios";
import {Table,Button, List} from 'antd'
import { DownOutlined } from '@ant-design/icons';

function FAQPage() {

    
    // useEffect(()=>{

    //     getFAQ()
        
    // },[])
    // const columns = [
    //     {
    //       title: '번호',
    //       dataIndex: 'num',
    //     },
    //     {
    //       title: '분류',
    //       dataIndex: 'category',
    //     },
    //     {
    //       title: '내용',
    //       dataIndex: 'content',
    //     },
    //     {
    //         title:'답변',
    //         dataIndex:'answer'
    //     }
    //   ];

    //   const expandedRowRender =()=>{
    //       console.log("wer")
    //  }

    //   const [data, setdata] = useState([])

    //   const getFAQ = ()=>{
            

    //         axios.post('/api/service/faq/getboard').then(response=>{
    //             for(let i=0; i<response.data.boardSize; i++){
    //                 let DataDic = {}
    //                 DataDic['key'] = i+1
    //                 DataDic['num'] = i+1
    //                 DataDic['category'] = response.data.Info[i].Continent
    //                 DataDic['content'] = response.data.Info[i].Question
    //                 DataDic['answer'] = response.data.Info[i].Answer
    //                 data.push(DataDic)
    //             }
    //             setdata(data)
    //             console.log(data)
                

    //         })

    //   }

      const writeHandler =(event)=>{
            axios.post('api/service/fqa/write').then(response =>{

            })
      }
      
const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Age', dataIndex: 'age', key: 'age' },
    { title: 'Address', dataIndex: 'address', key: 'address' },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: () => <a>Delete</a>,
    },
  ];
  
  const data = [
    {
      key: 1,
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
      key: 2,
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
    },
    {
      key: 3,
      name: 'Not Expandable',
      age: 29,
      address: 'Jiangsu No. 1 Lake Park',
      description: 'This not expandable',
    },
    {
      key: 4,
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
    },
  ];
      


      
    return (
        <div>

            <div style={{width:"75%", margin:'3rem auto'}}>              
                <h2>FQA</h2>
                {/* <Table
                    columns={columns}
                    dataSource={data}
                    expandable={{ expandedRowRender }}
                    />                 */}
                      <Table
                        columns={columns}
                        expandable={{
                             expandedRowRender: record => <p style={{ margin: 0 }}>{record.description}</p>,
                        }}
                        dataSource={data}
                    />
            </div>


            <div style={{marginLeft:'80%'}}>
                <Button onClick={writeHandler} ><a href='/service/faq/write'>글쓰기</a></Button>
            </div>
                  
        </div>
        
    )
}

export default FAQPage