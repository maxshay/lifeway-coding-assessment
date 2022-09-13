import axios from "axios";

const instance = axios.create({
  baseURL: "https://swapi.dev/api/",
  timeout: 10_000,
});

/**
 * Uses SWAPI to search for star wars characters.
 *
 * @param {String} searchTerm The string you want to search
 * @return {Array} response - Response Object
 * @return {Object} response[0] - Data returned from SWAPI
 * @return {(Object|String)} response[1] - Any error from axios
 */
export const searchUser = async (searchTerm) => {
  try {
    const response = await instance.get(`/people/?search=${searchTerm}`);
    return [response.data.results, null];
  } catch (error) {
    console.error(error.message);
    return [null, error.message];
  }
};

/**
 * Uses SWAPI to get details on a character.
 * Composes all species, film, starships names data into a single object.
 *
 * @param {String[]} queries The list of SWAPI api resources
 * @return {Array} response - Response Object
 * @return {Object} response[0] - Data returned from SWAPI
 * @return {(Object|String)} response[1] - Any error from axios
 */
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
