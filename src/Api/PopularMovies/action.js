import {GET_POPULAR_MOVIES} from './const';

export const getPopularMovies = payload => {
  return {
    type: GET_POPULAR_MOVIES,
    payload: payload,
  };
};
