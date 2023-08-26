import React, { useCallback } from "react";
import SearchIcon from "../icons/SearchIcon";
import "./styles.scss";

const Search = ({ searchValue, setSearchValue}) => {
  const handleSearchValue = useCallback(({target:{value}}) => {
    setSearchValue(value);
  }, [setSearchValue])

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
        onChange={handleSearchValue}
        className="search-input"
      />
      <button className="clear-button" onClick={clearInput}>
        &times;
      </button>
    </div>
  );
};

export default Search;
