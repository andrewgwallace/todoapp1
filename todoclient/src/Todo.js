import React, { Component } from 'react';
const axios = require('axios');


class Todo extends Component {

  render() {
  const {task, id} = this.props.task 
    return <div className="Task">
        {task}
        <span onClick={() => this.onClick(id)}> | delete </span>
        <span onClick={() => this.props.editTask(id)}> | edit </span>
      </div>;
  };

  onClick = id => {
    axios.delete(`/todos/${id}`)
    .then(result => { this.props.updateTasks(result.data) })
  }
}

export default Todo;
