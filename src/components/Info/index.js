import React, { useMemo } from "react";
import "./styles.scss";

const Info = ({ tasks }) => {
  const getAverageLength = useMemo(() => {
    const average = tasks.reduce((accumulator, curValue) => {
      return accumulator + curValue.title.length;
    }, 0);
    return Math.floor(average / tasks.length);
  }, [tasks]);

  const getMaxLength = useMemo(() => {
    let max = 0;
    tasks.forEach((task) => {
      if (task.title.length > max) max = task.title.length;
    });
    return max;
  }, [tasks]);

  const getMinLength = useMemo(() => {
    let min = tasks[0].title.length;
    tasks.forEach((task) => {
      if (task.title.length < min) min = task.title.length;
    });
    return min;
  }, [tasks]);

  return (
    <div className="info">
      <p>Average length = {getAverageLength}</p>
      <p>Max length = {getMaxLength}</p>
      <p>Min length = {getMinLength}</p>
    </div>
  );
};

export default Info;
