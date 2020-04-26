import { create } from "apisauce";
import { CancelToken } from 'apisauce';
import { CANCEL } from 'redux-saga'

const api = create({
  baseURL: "https://api.github.com",
});

export function searchRepositories(query) {
  return new Promise((resolve, reject) => {
    api.get(`/search/repositories?q=topic:${query}`).then((response) => {
      resolve(response);
    });
  });
}

