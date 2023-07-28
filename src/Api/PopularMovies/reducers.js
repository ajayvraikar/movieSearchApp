import {
  GET_POPULAR_MOVIES,
  GET_POPULAR_MOVIES_FAILURE,
  GET_POPULAR_MOVIES_SUCCESS,
} from './const';

const initialState = {
  popularMoviesData: null,
  isLoading: false,
  errorData: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_POPULAR_MOVIES:
      return {
        ...state,
        isLoading: true,
      };
    case GET_POPULAR_MOVIES_SUCCESS:
      return {
        isLoading: false,
        popularMoviesData: action.payload,
        errorData: null,
      };
    case GET_POPULAR_MOVIES_FAILURE:
      return {
        isLoading: false,
        errorData: action.payload,
        popularMoviesData: null,
      };
    default:
      return state;
  }
};
