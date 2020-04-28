import { create } from "apisauce";

const api = create({
  baseURL: "https://api.github.com",
  headers: { Accept: "application/vnd.github.mercy-preview+json" },
});

export function searchRepositories(query, page) {
  return new Promise((resolve, reject) => {
    api
      .get(`/search/repositories?q=topic:${query}&page=${page}`)
      .then((response) => {
        resolve(response);
      });
  });
}
