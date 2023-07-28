import {GET_MOVIES_DETAILS} from './const';

export const getMoviesDetails = payload => {
  return {
    type: GET_MOVIES_DETAILS,
    payload: payload,
  };
};
