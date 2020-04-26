import React from "react";

// import FormControl from "@material-ui/core/FormControl";
// import InputLabel from "@material-ui/core/InputLabel";
// import Input from "@material-ui/core/Input";
// import InputAdornment from "@material-ui/core/InputAdornment";
// import IconButton from "@material-ui/core/IconButton";
// import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export default function SearchForm(props) {
  return (
    // <FormControl className="search-form" onChange={props.handleSearch}>
    //   <InputLabel>Repository name</InputLabel>
    //   <Input
    //     endAdornment={
    //       <InputAdornment position="end">
    //         <IconButton aria-label="toggle password visibility">
    //           <SearchIcon />
    //         </IconButton>
    //       </InputAdornment>
    //     }
    //   />
    // </FormControl>
    <form onSubmit={props.handleSearch}>
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
