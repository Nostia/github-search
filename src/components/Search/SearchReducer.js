import {
  SEARCH_REQUEST,
  UPDATE_SEARCH_QUERY,
  SEARCH_SUCCESS,
  SET_CURRENT_PAGE,
  SEARCH_FAIL,
  SEARCH_CANCELLED,
} from "./SearchActions";

const initialState = {
  query: "",
  cache: null,
  searchInProgress: false,
  searchResult: null,
  currentPage: 1,
  totalPages: 1,
};

const search = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case SEARCH_REQUEST:
      return {
        ...state,
        searchInProgress: true,
      };
    case UPDATE_SEARCH_QUERY:
      return {
        ...state,
        query: action.query,
      };
    case SEARCH_SUCCESS:
      return {
        ...state,
        searchResult: action.searchResult,
        searchInProgress: false,
        totalPages: action.totalPages,
      };
    case SEARCH_FAIL:
      return {
        ...state,
        signInError: action.error,
        searchResult: null,
        searchInProgress: false,
      };
    case SEARCH_CANCELLED:
      return {
        ...state,
        searchInProgress: false,
      };
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.page,
      };
    default:
      return state;
  }
};

export default search;

export const getSearchQuery = (state) => {
  return state.search.query;
};
export const getSearchResult = (state) => {
  return state.search.searchResult;
};

export const getSearchInProgress = (state) => {
  return state.search.searchInProgress;
};

export const getCurrentPage = (state) => {
  return state.search.currentPage;
};

export const getTotalPages = (state) => {
  return Number(state.search.totalPages);
};
