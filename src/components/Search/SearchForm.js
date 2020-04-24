import React from "react";

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";

export default function SearchForm() {
  return (
    <FormControl className="search-form">
      <InputLabel>Repository name</InputLabel>
      <Input
        endAdornment={
          <InputAdornment position="end">
            <IconButton aria-label="toggle password visibility">
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
}
