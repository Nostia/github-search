import {
  SEARCH_REQUEST,
  UPDATE_SEARCH_QUERY,
  SEARCH_SUCCESS,
  SET_CURRENT_PAGE,
  SEARCH_FAIL,
  SEARCH_CANCELLED,
  CACHE_SEARCH_RESPONSE,
} from "./SearchActions";

const initialState = {
  query: "",
  cache: {},
  searchInProgress: false,
  searchResult: null,
  currentPage: 1,
  totalPages: 1,
  totalCount: 0,
};

const search = (state = initialState, action) => {
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
        totalCount: action.totalCount,
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
    case CACHE_SEARCH_RESPONSE: {
      return {
        ...state,
        cache: {
          ...state.cache,
          [action.query]: {
            ...(state.cache[action.query] || {}),
            [action.page]: action.searchResult,
            totalPages: action.totalPages,
            totalCount: action.totalCount,
          },
        },
      };
    }
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

export const getTotalCount = (state) => {
  return Number(state.search.totalCount);
};

export const getCachedResult = (state, query, page) => {
  try {
    return {
      searchResult: state.search.cache[query][page],
      totalPages: state.search.cache[query].totalPages,
      totalCount: state.search.cache[query].totalCount,
    };
  } catch (err) {
    return null;
  }
};
