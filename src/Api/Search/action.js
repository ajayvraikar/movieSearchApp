import {GET_MOVIE_BY_QUERY} from './const';

export const getMoviesByQuery = payload => {
  return {
    type: GET_MOVIE_BY_QUERY,
    payload: payload,
  };
};
