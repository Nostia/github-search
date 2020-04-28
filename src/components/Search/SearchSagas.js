import {
  take,
  put,
  call,
  fork,
  cancel,
  select,
  cancelled,
  delay,
  takeLatest,
} from "redux-saga/effects";
import {
  SEARCH_SUCCESS,
  CACHE_SEARCH_RESPONSE,
  SEARCH_REQUEST,
  CANCEL_SEARCH_REQUEST,
  SEARCH_CANCELLED,
} from "./SearchActions";
import { searchRepositories } from "./SearchApi";
import {
  getSearchQuery,
  getCurrentPage,
  getCachedResult,
} from "./SearchReducer";
let parse = require("parse-link-header");

function parseLinkHeader(link) {
  const parsed = parse(link);
  return !parsed
    ? 1
    : parsed.last
    ? Number(parsed.last.page)
    : Number(parsed.prev.page) + 1;
}

function* search(action) {
  try {
    const query = yield select(getSearchQuery);
    const page = yield select(getCurrentPage);
    let cached = yield select(getCachedResult, query, page);

    if (!cached || !cached.searchResult) {
      //for testing canceling request
      yield delay(2000);
      let searchResult = yield call(searchRepositories, query, page);
      let totalPages = parseLinkHeader(searchResult.headers.link);
      yield put({
        type: CACHE_SEARCH_RESPONSE,
        query,
        page,
        searchResult: searchResult.data.items,
        totalPages,
        totalCount: searchResult.data.total_count,
      });
      cached = yield select(getCachedResult, query, page);
    }

    yield put({
      type: SEARCH_SUCCESS,
      searchResult: cached.searchResult,
      totalPages: cached.totalPages,
      totalCount: cached.totalCount,
    });
  } catch (err) {
    console.log(err);
  } finally {
    if (yield cancelled()) {
      yield put({ type: SEARCH_CANCELLED });
    }
  }
}

export function* handleSearch() {
  const searchWatcher = yield fork(search);
  yield take(CANCEL_SEARCH_REQUEST);
  yield cancel(searchWatcher);
}

export function* onSearch() {
  yield takeLatest(SEARCH_REQUEST, handleSearch);
}
