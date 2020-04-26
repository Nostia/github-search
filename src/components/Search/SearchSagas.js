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
  SEARCH_FAIL,
  SEARCH_REQUEST,
  CANCEL_SEARCH_REQUEST,
  SEARCH_CANCELLED,
} from "./SearchActions";
import { searchRepositories } from "./SearchApi";
import { getSearchQuery } from "./SearchReducer";

function* search(action) {
  try {
    const query = yield select(getSearchQuery);
    yield delay(2000);
    let searchResult = yield call(searchRepositories, query);
    yield put({
      type: SEARCH_SUCCESS,
      searchResult: searchResult.data.items,
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
