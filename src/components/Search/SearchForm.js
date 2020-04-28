import React from "react";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export default function SearchForm(props) {
  return (
    <form onSubmit={props.handleSearch} className="search-form">
      <TextField
        className="todo-add-input"
        value={props.searchQuery}
        onChange={props.handleChange}
        placeholder="Repository name"
      ></TextField>
      {props.isSearchInProgress ? (
        <Button onClick={props.handleCancel}>Cancel</Button>
      ) : (
        ""
      )}
    </form>
  );
}
