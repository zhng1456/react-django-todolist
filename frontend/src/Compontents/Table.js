import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import PrioritySelect from "./PrioritySelect";
import { Table, Input, Popconfirm, Form } from "antd";

const data = [
  {
    key: "1",
    content: "study english",
    priority: 2,
    date: "2018-09-03"
  },
  {
    key: "2",
    content: "play",
    priority: 1,
    date: "2018-07-02"
  },
  {
    key: "3",
    content: "tv",
    priority: 2,
    date: "2018-10-01"
  },
  {
    key: "4",
    content: "switch",
    priority: 0,
    date: "2020-01-01"
  }
];
const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
  getInput = record => {
    //这里的逻辑很关键
    //原本age的inputType是number，其他2列是text
    //现在希望将age改为todolist中的priority

    //priority需要对应<PrioritySelect />
    //content对应<Input />
    //date对应<DatePciker />
    //console.log(record);
    if (this.props.inputType === "priority") {
      return <PrioritySelect myValue={record.priority} />;
    }
    return <Input />;
  };

  render() {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      ...restProps
    } = this.props;
    return (
      <EditableContext.Consumer>
        {form => {
          const { getFieldDecorator } = form;
          return (
            <td {...restProps}>
              {editing ? (
                <FormItem style={{ margin: 0 }}>
                  {getFieldDecorator(dataIndex, {
                    rules: [
                      {
                        required: true,
                        message: `Please Input ${title}!`
                      }
                    ],
                    initialValue: record[dataIndex]
                  })(this.getInput(record))}
                </FormItem>
              ) : (
                restProps.children
              )}
            </td>
          );
        }}
      </EditableContext.Consumer>
    );
  }
}

export class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data, editingKey: "" };
    this.columns = [
      {
        title: "content",
        dataIndex: "content",
        width: "25%",
        editable: true
      },
      {
        title: "priority",
        dataIndex: "priority",
        width: "15%",
        editable: true
      },
      {
        title: "date",
        dataIndex: "date",
        width: "40%",
        editable: true
      },
      {
        title: "operation",
        dataIndex: "operation",
        render: (text, record) => {
          const editable = this.isEditing(record);
          return (
            <div>
              {editable ? (
                <span>
                  <EditableContext.Consumer>
                    {form => (
                      <a
                        href="javascript:;"
                        onClick={() => this.save(form, record.key)}
                        style={{ marginRight: 8 }}
                      >
                        Save
                      </a>
                    )}
                  </EditableContext.Consumer>
                  <Popconfirm
                    title="Sure to cancel?"
                    onConfirm={() => this.cancel(record.key)}
                  >
                    <a>Cancel</a>
                  </Popconfirm>
                </span>
              ) : (
                <a onClick={() => this.edit(record.key)}>Edit</a>
              )}
            </div>
          );
        }
      }
    ];
  }

  isEditing = record => {
    return record.key === this.state.editingKey;
  };

  edit(key) {
    this.setState({ editingKey: key });
  }

  save(form, key) {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      const newData = [...this.state.data];
      const index = newData.findIndex(item => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row
        });
        this.setState({ data: newData, editingKey: "" });
      } else {
        newData.push(row);
        this.setState({ data: newData, editingKey: "" });
      }
    });
  }

  cancel = () => {
    this.setState({ editingKey: "" });
  };

  render() {
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell
      }
    };

    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      //下面这里根据col.dataIndex赋值inputType
      //再根据inputType判断点击Edit后的输入类型
      //priority需要对应<PrioritySelect />
      //content对应<Input />
      //date对应<DatePciker />
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: col.dataIndex,
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record)
        })
      };
    });

    return (
      <Table
        components={components}
        bordered
        dataSource={this.state.data}
        columns={columns}
        rowClassName="editable-row"
      />
    );
  }
}
