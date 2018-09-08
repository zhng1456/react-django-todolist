import { Select } from "antd";
import React, { Component } from "react";
class PrioritySelect extends Component {
  constructor(props) {
    super(props);
  }
  priorityChange = value => {
    console.log(value);
  };
  render() {
    const Option = Select.Option;
    return (
      <Select
        defaultValue={''+this.props.myValue}
        onChange={this.priorityChange}
      >
        <Option value="0">一般</Option>
        <Option value="1">紧急</Option>
        <Option value="2">非常紧急</Option>
      </Select>
    );
  }
}
export default PrioritySelect;
