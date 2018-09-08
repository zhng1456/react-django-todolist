import React,{Component} from 'react';
import { Input } from 'antd';
import { DatePicker } from 'antd';
import { Row, Col } from 'antd';
import AddPrioritySelect from './AddPrioritySelect'
import { Button } from 'antd';
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
//顶部的输入部分，包括input，日期选择，与优先级选择
class TodoInput extends Component{
    constructor(props){
        super(props);
    }
    dateOnChange=(date,dateString) =>{console.log(date,dateString)};
    render(){
        return (
            <div>
                <h1>Todos</h1>
                <Row>
                <Col span={15}><Input type="text" placeholder="接下来做什么？"/></Col>
                <Col span={3}><DatePicker onChange={this.dateOnChange} /></Col>
                <Col span={3}><AddPrioritySelect  /></Col>
                <Col span={3}><Button type="primary">Add</Button></Col>
                </Row>
            </div>
        );
    }
}
export default TodoInput;