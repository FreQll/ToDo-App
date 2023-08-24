import React, { useCallback, useState } from "react";
import "./Task.scss";
import { PenIcon } from "../icons/PenIcon";
import { TrashIcon } from "../icons/TrashIcon";
import ArrowUp from "../icons/ArrowUp";
import ArrowDown from "../icons/ArrowDown";

function Task(props) {
  const { title, isComplete } = props;

  const [editing, setEditing] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState(title);
  const [isCompleted, setIsCompleted] = useState(isComplete);
  const [taskTitle, setTaskTitle] = useState(title);

  const [positionOffset, setPositionOffset] = useState(0);

  const todoCompleted = useCallback(() => {
    setIsCompleted(!isCompleted);
  }, [isCompleted]);

  const removeTask = useCallback(() => {
    const { id, handleDeleteTask } = props;
    handleDeleteTask(id);
  }, [props]);

  const editTask = useCallback(() => {
    setEditing(!editing);
  }, [editing]);

  const applyChanges = useCallback(() => {
    const { tasks, setTasks } = props;
    if (newTaskTitle.trim() !== "") {
      setEditing(false);
      setTaskTitle(newTaskTitle);
      const updatedTasks = tasks.map((task) =>
        task.id === props.id ? { ...task, title: newTaskTitle } : task
      );
      setTasks(updatedTasks);
    }
  }, [newTaskTitle, props]);

  const handleInputChange = useCallback(({ target: { value } }) => {
    setNewTaskTitle(value);
  }, []);

  const moveUp = useCallback(() => {
    const { id, tasks, setTasks } = props;
    const index = tasks
      .map((e) => {
        return e.id;
      })
      .indexOf(id);
    if (index === 0) return;
    let tempArray = [...tasks];
    const tempElement = tempArray[index];
    tempArray[index] = tempArray[index - 1];
    tempArray[index - 1] = tempElement;
    setTimeout(() => {
      setTasks(tempArray);
    }, 800);
    setPositionOffset(-1);
  }, [props]);

  const moveDown = useCallback(() => {
    const { id, tasks, setTasks } = props;
    const index = tasks
      .map((e) => {
        return e.id;
      })
      .indexOf(id);
    if (index + 1 === tasks.length) return;
    let tempArray = [...tasks];
    const tempElement = tempArray[index];
    tempArray[index] = tempArray[index + 1];
    tempArray[index + 1] = tempElement;
    setTimeout(() => {
      setTasks(tempArray);
    }, 800);

    setPositionOffset(1);
  }, [props]);

  return (
    <div
      className="task-block"
      style={{
        transform: `translateY(${positionOffset * 12}px)`,
      }}
      onTransitionEnd={() => setPositionOffset(0)}
    >
      {!editing && (
        <div className="options-container">
          <div className="move-container">
            <div onClick={moveUp}>
              <ArrowUp />
            </div>
            <div onClick={moveDown}>
              <ArrowDown />
            </div>
          </div>
          <input
            type="checkbox"
            onClick={todoCompleted}
            value={isCompleted}
            className="checkbox-input"
          />
        </div>
      )}
      {editing ? (
        <input
          onChange={handleInputChange}
          type="text"
          value={newTaskTitle}
          className="changeText-input"
        />
      ) : (
        <div
          className="task-text"
          style={{
            textDecoration: isCompleted ? "line-through" : null,
          }}
        >
          {taskTitle}
        </div>
      )}

      <div className="task-buttons">
        {editing ? (
          <div onClick={applyChanges}>&#10003;</div>
        ) : (
          <div onClick={removeTask}>
            <TrashIcon />
          </div>
        )}

        {!isCompleted && (
          <div onClick={editTask}>
            {editing ? <div>&times;</div> : <PenIcon />}
          </div>
        )}
      </div>
    </div>
  );
}

export default Task;
