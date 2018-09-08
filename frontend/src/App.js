import React, { Component } from 'react';
import TodoInput from './Compontents/TodoInput'
import {EditableTable} from './Compontents/Table'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <TodoInput />
        <EditableTable />
      </div>
    );
  }
}

export default App;