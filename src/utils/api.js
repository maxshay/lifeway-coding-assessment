import axios from "axios";

const instance = axios.create({
  baseURL: "https://swapi.dev/api/",
  timeout: 10_000,
  // headers: { "X-Custom-Header": "foobar" }
});

export const searchUser = async (searchTerm) => {
  try {
    const response = await instance.get(`/people/?search=${searchTerm}`);
    return [response.data.results, null];
  } catch (error) {
    console.error(error.message);
    return [null, error.message];
  }
};

export const getDetailsFromUrls = async (queries) => {
  try {
    const requests = [];
    for (let i = 0; i < queries.length; i++) {
      requests.push(axios.get(queries[i]));
    }
    const results = {
      movies: [],
      starships: [],
      species: [],
    };
    const responses = await axios.all(requests);
    responses.forEach((r) => {
      if (r.data.title) {
        results.movies.push(r.data.title);
      } else if (r.data.average_lifespan) {
        results.species.push(r.data.name);
      } else if (r.data.name) {
        results.starships.push(r.data.name);
      }
    });
    return [results, null];
  } catch (error) {
    console.error(error.message);
    return [null, error.message];
  }
};
