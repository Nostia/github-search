import { all } from "redux-saga/effects";
import { onSearch } from "./components/Search/SearchSagas";

export default function* rootSaga() {
  yield all([onSearch()]);
}
