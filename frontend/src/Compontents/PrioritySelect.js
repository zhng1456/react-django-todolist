import { Select } from 'antd';
import React,{Component} from 'react'
class PrioritySelect extends Component{
    priorityChange=(value)=>{
        console.log(value); 
    };
    render(){
        const Option = Select.Option;
        return (
            <Select defaultValue="0"  onChange={this.priorityChange}>
            <Option value="0">一般</Option>
            <Option value="1">紧急</Option>
            <Option value="2">非常紧急</Option>
            </Select>
        );
    }
}
export default PrioritySelect;