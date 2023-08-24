import React, { useState, useCallback, useEffect } from "react";
import "./Info.scss";

const Info = ({ tasks }) => {
  const [averageLength, setAverageLength] = useState(0);
  const [maxLength, setMaxLength] = useState(0);
  const [minLength, setMinLength] = useState(0);

  const getAverageLength = useCallback(() => {
    const average = tasks.reduce((accumulator, curValue) => {
      return accumulator + curValue.title.length;
    }, 0);
    setAverageLength(Math.floor(average / tasks.length));
  }, [tasks]);

  const getMaxLength = useCallback(() => {
    let max = 0;
    tasks.forEach((task) => {
      if (task.title.length > max) max = task.title.length;
    });
    setMaxLength(max);
  }, [tasks]);

  const getMinLength = useCallback(() => {
    let min = tasks[0].title.length;
    tasks.forEach((task) => {
      if (task.title.length < min) min = task.title.length;
    });
    setMinLength(min);
  }, [tasks]);

  useEffect(() => {
    if (tasks.length !== 0) {
      getAverageLength();
      getMaxLength();
      getMinLength();
    }
  }, [getAverageLength, getMaxLength, getMinLength, tasks]);

  return (
    <div className="info">
      <p>Average length = {averageLength}</p>
      <p>Max length = {maxLength}</p>
      <p>Min length = {minLength}</p>
    </div>
  );
};

export default Info;
