import React from "react";
import { connect } from "react-redux";

import SearchForm from "./SearchForm";
import SearchList from "./SearchList";
import {
  SEARCH_REQUEST,
  UPDATE_SEARCH_QUERY,
  CANCEL_SEARCH_REQUEST,
  SET_CURRENT_PAGE,
} from "./SearchActions";
import {
  getSearchQuery,
  getSearchResult,
  getSearchInProgress,
  getTotalPages,
  getCurrentPage,
} from "./SearchReducer";

import "./Search.scss";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  searchRepositories = (e) => {
    e.preventDefault();
    this.props.setCurrentPage(1);
    this.props.searchRepositories();
  };

  updateSearchQuery = (e) => {
    this.props.updateSearchQuery(e.target.value);
  };

  cancelSearch = (e) => {
    this.props.cancelSearch();
  };

  handlePageChange = (e, v) => {
    this.props.setCurrentPage(v);
    this.props.searchRepositories();
  };

  render() {
    return (
      <div className="search-wrapper">
        <SearchForm
          handleSearch={this.searchRepositories}
          handleChange={this.updateSearchQuery}
          handleCancel={this.cancelSearch}
          searchQuery={this.props.searchQuery}
          isSearchInProgress={this.props.isSearchInProgress}
        ></SearchForm>
        <SearchList
          list={this.props.searchResult}
          totalPages={this.props.totalPages}
          currentPage={this.props.currentPage}
          handlePageChange={this.handlePageChange}
        ></SearchList>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    searchQuery: getSearchQuery(state),
    searchResult: getSearchResult(state),
    isSearchInProgress: getSearchInProgress(state),
    totalPages: getTotalPages(state),
    currentPage: getCurrentPage(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateSearchQuery: (query) =>
      dispatch({ type: UPDATE_SEARCH_QUERY, query }),
    searchRepositories: () => dispatch({ type: SEARCH_REQUEST }),
    cancelSearch: () => dispatch({ type: CANCEL_SEARCH_REQUEST }),
    setCurrentPage: (page) => dispatch({ type: SET_CURRENT_PAGE, page }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
