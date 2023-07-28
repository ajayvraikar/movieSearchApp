import {
  GET_MOVIES_DETAILS,
  GET_MOVIES_DETAILS_FAILURE,
  GET_MOVIES_DETAILS_SUCCESS,
} from './const';

const initialState = {
  movieDetails: null,
  isLoading: false,
  errorData: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_MOVIES_DETAILS:
      return {
        ...state,
        isLoading: true,
      };
    case GET_MOVIES_DETAILS_SUCCESS:
      return {
        isLoading: false,
        movieDetails: action.payload,
        errorData: null,
      };
    case GET_MOVIES_DETAILS_FAILURE:
      return {
        isLoading: false,
        errorData: action.payload,
        movieDetails: null,
      };
    default:
      return state;
  }
};
