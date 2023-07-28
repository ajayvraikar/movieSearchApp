import {
  GET_MOVIE_BY_QUERY,
  GET_MOVIE_BY_QUERY_FAILURE,
  GET_MOVIE_BY_QUERY_SUCCESS,
} from './const';
const initialState = {
  movieData: null,
  isLoading: false,
  errorData: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_MOVIE_BY_QUERY:
      return {
        ...state,
        isLoading: true,
      };
    case GET_MOVIE_BY_QUERY_SUCCESS:
      return {
        isLoading: false,
        movieData: action.payload,
        errorData: null,
      };
    case GET_MOVIE_BY_QUERY_FAILURE:
      return {
        isLoading: false,
        errorData: action.payload,
        movieData: null,
      };
    default:
      return state;
  }
};
