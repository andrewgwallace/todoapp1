import React, { Component } from "react";
import { Row, Input, Button } from "react-materialize";
const axios = require('axios');

class TodoForm extends Component {

  onSubmit = e => {
    e.preventDefault();
    const { task, id } = this.props.currentTask;
    this.props.editing ?
      axios.patch(`/todos/${id}`, {task})
        .then(result => {
          this.props.updateTasks(result.data);
        })
      :
      axios.post(`/todos/`, {task})
        .then(result => {
          this.props.updateTasks(result.data);
        })
  }

  onChange = e => { this.props.updateTask(e.target.name, e.target.value) };

  render() {
    // const { task } = this.props.currentTask
    return (
        <Row>
          <form className="Task" onSubmit={this.onSubmit}>
            <Input 
            placeholder="Task Name" 
            s={6}
            name="task"
            onChange={this.onChange}
            />
          <Button type="submit" waves='light'>{this.props.editing ? "Update" : "Add"}</Button>
          </form>
        </Row>
    )
  }


}

export default TodoForm;