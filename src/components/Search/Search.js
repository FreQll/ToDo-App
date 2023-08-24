import React, { useCallback } from "react";
import SearchIcon from "../icons/SearchIcon";
import "./Search.scss";

const Search = ({ searchValue, setSearchValue, setSearchStorage, tasks }) => {
  const findTodos = useCallback(
    (e) => {
      setSearchValue(e);

      const result = tasks.filter((task) => {
        return task.title.toLocaleLowerCase().includes(e.toLocaleLowerCase());
      });
      setSearchStorage(result);
    },
    [tasks, setSearchValue, setSearchStorage]
  );

  const clearInput = useCallback(() => {
    setSearchValue("");
  }, [setSearchValue]);

  return (
    <div className="search-container">
      <div className="icon">
        <SearchIcon />
      </div>

      <input
        value={searchValue}
        type="text"
        onChange={(e) => findTodos(e.target.value)}
        className="search-input"
      />
      <button className="clear-button" onClick={clearInput}>
        &times;
      </button>
    </div>
  );
};

export default Search;
