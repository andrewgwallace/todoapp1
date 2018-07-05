import React, { Component } from 'react';
import TodoForm from "./TodoForm";
import Todo from "./Todo";
const axios = require('axios');

class App extends Component {
  state = {
    editing: false,
    tasks: [],
    currentTask: ''
  }


  // AXIOS METHOD
  // componentWillMount = () => {
  //   axios.get('http://localhost:3004/todos')
  //     .then(response => {
  //       let tasks = response.data;
  //       this.setState({ tasks: tasks });
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     })
  // }

  //ASYNC/AWAIT METHOD
  componentWillMount = async () => {
    const response = await fetch("http://localhost:3004/todos");
    const tasks = await response.json();
    this.setState({ tasks: tasks });
    console.log(this.state.tasks)
  };

  updateTasks = tasks => {
    this.setState({
      tasks: tasks,
      editing: false,
      currentTask: ''
    })
  }

  updateTask = (attr, value) => {
    this.setState({
      currentTask: { ...this.state.currentTask, [attr]: value }
    });
  }

  editTask = id => {
    const task = this.state.tasks.find(task => task.id === id);
    this.setState({ editing: true, currentTask: task })
  }


  render() {
    const tasks = this.state.tasks.map(task => {
      return (
        <Todo
        key={task.id}
        task={task}
        updateTasks={this.updateTasks}
        editTask={this.editTask}
        />
      );
    });

    return (
      <div className="App">
        <TodoForm
          updateTasks={this.updateTasks}
          updateTask={this.updateTask}
          currentTask={this.state.currentTask}
          editing={this.state.editing}
          cancelEdit={this.cancelEdit}
        />
          {tasks}
      </div>
    )
  }
}

export default App;
