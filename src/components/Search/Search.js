import React from "react";

import SearchForm from "./SearchForm";
import SearchList from "./SearchList";

import "./Search.scss";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchList: [
        { id: "1", title: "first", url: "" },
        { id: "2", title: "second", url: "" },
        { id: "3", title: "third", url: "" },
      ],
    };
  }

  render() {
    return (
      <div className="search-wrapper">
        <SearchForm></SearchForm>
        <SearchList list={this.state.searchList}></SearchList>
      </div>
    );
  }
}

export default Search;
