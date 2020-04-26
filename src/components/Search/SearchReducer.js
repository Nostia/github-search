const initialState = {
  query: "",
  cache: null,
  searchInProgress: false,
  searchResult: null,
};

const search = (state = initialState, action) => {
  switch (action.type) {
    case "SEARCH_REQUEST":
      return {
        ...state,
        searchInProgress: true,
      };
    case "UPDATE_SEARCH_QUERY":
      return {
        ...state,
        query: action.query,
      };
    case "SEARCH_SUCCESS":
      return {
        ...state,
        searchResult: action.searchResult,
        signInError: null,
        searchInProgress: false,
      };
    case "SEARCH_FAIL":
      return {
        ...state,
        signInError: action.error,
        searchResult: null,
        searchInProgress: false,
      };
    case "SEARCH_CANCELLED":
      return {
        ...state,
        searchInProgress: false,
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
