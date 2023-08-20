import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.scss";
import Task from "./components/Task/Task";

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Buy milk", completed: false },
    { id: 2, title: "Make coffee", completed: false },
    { id: 3, title: "Walking the dog in the park", completed: false },
  ]);
  const [universities, setUniversities] = useState("");
  const [newTaskTitle, setNewTaskTitle] = useState("");

  useEffect(() => {
    fetch(`http://universities.hipolabs.com/search?country=Ukraine`)
      .then((response) => {
        return response.json();
      })
      .then((data) => setUniversities(data.slice(0, 10)));
  }, []);

  function handleDeleteTask(taskId) {
    setTasks(tasks.filter((task) => task.id !== taskId));
  }

  function handleInputChange(event) {
    setNewTaskTitle(event.target.value);
  }

  function addTask() {
    if (newTaskTitle.trim() !== "") {
      setTasks(
        tasks.concat([{ id: uuidv4(), title: newTaskTitle, completed: false }])
      );
    }
  }

  function clearInput() {
    setNewTaskTitle("");
  }

  return (
    <div className="App">
      <h1>Todo App</h1>

      <div className="app-container">
        <div className="tasks-input">
          <input
            value={newTaskTitle}
            onChange={handleInputChange}
            type="text"
            className="newTask-input"
          />
          <div className="button-container">
            <button onClick={() => clearInput()}>&times;</button>
          </div>
          <button className="addTask-button" onClick={() => addTask()}>
            &#43;
          </button>
        </div>

        <div className="tasks-container">
          {tasks &&
            tasks.map((task) => {
              return (
                <Task
                  id={task.id}
                  title={task.title}
                  isComplete={task.completed}
                  handleDeleteTask={() => handleDeleteTask(task.id)}
                  key={`task${task.id}`}
                />
              );
            })}
        </div>

        <div className="universities">
          {universities &&
            universities.map((uni) => {
              return (
                <div>
                  <div key={`uni${uni.name}`}>{uni.name}</div>
                  <div>
                    {uni.domains.map((domain) => { 
                      return (<a href={`http://${domain}`}>{domain}</a>)
                    })}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default App;
