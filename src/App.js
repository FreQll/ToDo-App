import { Component } from "react";
import "./App.scss";
import Task from "./components/Task/Task";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [
        { id: 1, title: "Buy milk", completed: false },
        { id: 2, title: "Make coffee", completed: false },
        { id: 3, title: "Walking the dog in the park", completed: false },
      ],
      newTaskTitle: "",
    };

    this.handleDeleteTask = this.handleDeleteTask.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.addTask = this.addTask.bind(this);
    this.clearInput = this.clearInput.bind(this);
  }

  handleDeleteTask = (taskId) => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.filter((task) => task.id !== taskId),
    }));
  };

  handleInputChange = (event) => {
    this.setState({ newTaskTitle: event.target.value });
  };

  addTask() {
    const { newTaskTitle, tasks } = this.state;

    if (newTaskTitle.trim() !== "") {
      const newTask = {
        id: tasks.length + 1,
        title: newTaskTitle,
        completed: false,
      };

      this.setState({
        tasks: [...tasks, newTask],
        newTaskTitle: "",
      });
    }
  }

  clearInput() {
    this.setState({
      newTaskTitle: "",
    });
  }

  render() {
    const { tasks, newTaskTitle } = this.state;

    return (
      <div className="App">
        <h1>Todo App</h1>

        <div className="app-container">
          <div className="tasks-input">
            <input
              value={newTaskTitle}
              onChange={this.handleInputChange}
              type="text"
              className="newTask-input"
            />
            <div className="button-container">
              <button onClick={this.addTask}>&#43;</button>
              <button onClick={this.clearInput}>&times;</button>
            </div>
          </div>

          <div className="tasks-container">
            {tasks &&
              tasks.map((task) => {
                return (
                  <Task
                    id={task.id}
                    title={task.title}
                    isComplete={task.completed}
                    handleDeleteTask={this.handleDeleteTask}
                    key={task.id}
                  />
                );
              })}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
