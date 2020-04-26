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
    //
    // while (true) {
    const query = yield select(getSearchQuery);
    console.log("start search saga", query);
    // yield put(actions.requestStart())
    yield delay(3000);
    let searchResult = yield call(searchRepositories, query);
    yield put({
      type: SEARCH_SUCCESS,
      searchResult: searchResult.data.items,
    });
    console.log("saga success---------");
    //
  } finally {
    console.log("saga finally------");
    if (yield cancelled()) {
      console.log("--cancelled--");
      yield put({ type: SEARCH_CANCELLED });
    }
  }
}

export function* onSearch() {
  console.log("onSearch");
  //   const searchWatcher = yield takeLatest(SEARCH_REQUEST, search);
  //   yield take(CANCEL_SEARCH_REQUEST);
  //   yield cancel(searchWatcher);

  while (yield take(SEARCH_REQUEST)) {
    // starts the task in the background
    const searchWatcher = yield fork(search);

    // wait for the user stop action
    yield take(CANCEL_SEARCH_REQUEST);
    // user clicked stop. cancel the background task
    // this will cause the forked bgSync task to jump into its finally block
    yield cancel(searchWatcher);
  }
}
