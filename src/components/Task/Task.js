import React, { useState } from "react";
import "./Task.scss";
import { PenIcon } from "../icons/PenIcon";
import { TrashIcon } from "../icons/TrashIcon";

function Task(props) {
  const { title, isComplete } = props;

  const [editing, setEditing] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState(title);
  const [isCompleted, setIsCompleted] = useState(isComplete);
  const [taskTitle, setTaskTitle] = useState(title);

  function todoCompleted() {
    setIsCompleted(!isCompleted);
  }

  function removeTask() {
    const { id, handleDeleteTask } = props;
    handleDeleteTask(id);
  }

  function editTask() {
    setEditing(!editing);
  }

  function applyChanges() {
    if (newTaskTitle.trim() !== "") {
      setEditing(false);
      setTaskTitle(newTaskTitle);
    }
  }

  function handleInputChange(event) {
    setNewTaskTitle(event.target.value);
  }

  return (
    <div className="task-block">
      {!editing && (
        <input
          type="checkbox"
          onClick={() => todoCompleted()}
          value={isCompleted}
        />
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
          <div onClick={() => applyChanges()}>&#10003;</div>
        ) : (
          <div onClick={() => removeTask()}>
            <TrashIcon />
          </div>
        )}

        {!isCompleted && (
          <div onClick={() => editTask()}>
            {editing ? <div>&times;</div> : <PenIcon />}
          </div>
        )}
      </div>
    </div>
  );
}

export default Task;
