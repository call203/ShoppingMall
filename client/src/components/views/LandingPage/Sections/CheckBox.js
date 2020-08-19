import React,{useState} from 'react'
import { Collapse,Checkbox } from 'antd';

const { Panel } = Collapse;

function CheckBox(props) {

    const [Checked, setChecked] = useState([])

    const handleToggle=(value)=>{
        //1. 누른 것의 Index를 구한다.
        const currentIndex = Checked.indexOf(value)
        
        //2. 전체 checked된 state에서 현재 누른  check가 이미 있다면 
        const newChecked =[...Checked]
        if (currentIndex ===-1){

            newChecked.push(value)

        }else{  //빼주고
            newChecked.splice(value,1)
        }
        //3. state을 넣어준다.
        setChecked(newChecked)
        props.handleFilters(newChecked)

        
    }

    const renderCheckboxList = ()=>
        props.list && props.list.map((value, index)=>(
            <React.Fragment key={index}>

                <Checkbox onChange={()=> handleToggle(value.name)}>
                    <span>{value.name}</span>
                </Checkbox>

            </React.Fragment>
        ))
    

    return (
        <div>
             <Collapse defaultActiveKey={['0']}>
                <Panel header="종류" key="1">
                 {renderCheckboxList()}   

                </Panel>
                
            </Collapse>
        </div>
    )
}

export default CheckBox