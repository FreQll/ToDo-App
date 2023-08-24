import React, { useCallback, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.scss";
import Task from "./components/Task/Task";
import Search from "./components/Search/Search";
import Info from "./components/Info/Info";

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Buy milk", completed: false },
    { id: 2, title: "Walking the dog in the park", completed: false },
    { id: 3, title: "Make coffee", completed: false },
  ]);
  const [searchStorage, setSearchStorage] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [universities, setUniversities] = useState("");
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [isSortAsc, setIsSortAsc] = useState(true);

  const getUni = async () => {
    await fetch("http://universities.hipolabs.com/search?country=Ukraine")
      .then((response) => {
        return response.json();
      })
      .then((data) => setUniversities(data.slice(0, 10)));
  };

  useEffect(() => {
    setSearchStorage(
      tasks.filter((task) => {
        return task.title
          .toLocaleLowerCase()
          .includes(searchValue.toLocaleLowerCase());
      })
    );
  }, [searchValue, tasks]);

  useEffect(() => {
    getUni();
  }, []);

  const handleDeleteTask = useCallback((taskId) => {
    setTasks((prevValue) => prevValue.filter((task) => task.id !== taskId));
  }, []);

  const handleChangeTask = useCallback(
    (taskId, newTitle) => {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, title: newTitle } : task
        )
      );
      console.log(tasks);
    },
    [tasks]
  );

  const handleInputChange = useCallback(({ target: { value } }) => {
    setNewTaskTitle(value);
  }, []);

  const clearInput = useCallback(() => {
    setNewTaskTitle("");
  }, []);

  const addTask = useCallback(() => {
    if (newTaskTitle.trim() !== "") {
      setTasks((prevValue) => [
        ...prevValue,
        { id: uuidv4(), title: newTaskTitle, completed: false },
      ]);
      clearInput();
    }
  }, [newTaskTitle, clearInput]);

  const sortTasks = useCallback(() => {
    if (isSortAsc) {
      setTasks(
        tasks.toSorted((a, b) => {
          return a.title.localeCompare(b.title);
        })
      );
    } else {
      setTasks(
        tasks.toSorted((a, b) => {
          return b.title.localeCompare(a.title);
        })
      );
    }
    setIsSortAsc(!isSortAsc);
  }, [tasks, isSortAsc]);

  return (
    <div className="App">
      <h1>Todo App</h1>

      <div className="app-container">
        <div>
          <div className="tasks-input">
            <div className="sort" onClick={sortTasks}>
              {isSortAsc ? "▼" : "▲"}
            </div>

            <input
              value={newTaskTitle}
              onChange={handleInputChange}
              type="text"
              className="newTask-input"
            />
            <div className="button-container">
              <button onClick={clearInput}>&times;</button>
            </div>
            <button className="addTask-button" onClick={addTask}>
              &#43;
            </button>
          </div>

          <Search
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            setSearchStorage={setSearchStorage}
            tasks={tasks}
          />
        </div>

        <Info tasks={tasks} />

        <div className="tasks-container">
          {!searchValue
            ? tasks &&
              tasks.map((task) => {
                return (
                  <Task
                    id={task.id}
                    title={task.title}
                    isComplete={task.completed}
                    handleDeleteTask={() => handleDeleteTask(task.id)}
                    handleChangeTask={handleChangeTask}
                    tasks={tasks}
                    setTasks={setTasks}
                    key={`task${task.id}`}
                  />
                );
              })
            : searchStorage &&
              searchStorage.map((task) => {
                return (
                  <Task
                    id={task.id}
                    title={task.title}
                    isComplete={task.completed}
                    handleDeleteTask={() => handleDeleteTask(task.id)}
                    handleChangeTask={handleChangeTask}
                    tasks={tasks}
                    setTasks={setTasks}
                    key={`task${task.id}`}
                  />
                );
              })}
          {}
        </div>

        <div className="universities">
          {universities &&
            universities.map((uni) => {
              return (
                <div>
                  <div key={`uni${uni.name}`}>{uni.name}</div>
                  <div>
                    {uni.domains.map((domain) => {
                      return <a href={`http://${domain}`}>{domain}</a>;
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
