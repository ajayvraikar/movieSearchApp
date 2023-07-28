import {call, put, takeLatest} from 'redux-saga/effects';
import {
  GET_MOVIES_DETAILS,
  GET_MOVIES_DETAILS_FAILURE,
  GET_MOVIES_DETAILS_SUCCESS,
  GET_POPULAR_MOVIES,
  GET_POPULAR_MOVIES_FAILURE,
  GET_POPULAR_MOVIES_SUCCESS,
} from './const';
import axios from 'axios';

async function getMovieDetailsSagaApi(movieId) {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `https://api.themoviedb.org/3/movie/${movieId}`,
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MzA2NTM4NDkzOWU3NDU1YTI4YTYzYzFmYTlhYzllMyIsInN1YiI6IjY0YzBjNjNjMmYxYmUwMDEwYzgxYTgxZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.aL3dnfwwkvOcRgEZ-AgsmK-S54x507pCjqryq87Gkwk',
      accept: 'application/json',
    },
  };
  const response = await axios.request(config);
  return response;
}
function* getMovieDetailsSaga(action) {
  try {
    const response = yield call(getMovieDetailsSagaApi, action?.payload?.movieId);
    yield put({type: GET_MOVIES_DETAILS_SUCCESS, payload: response.data});
    if (action?.payload?.onSuccess) {
      action?.payload?.onSuccess(response);
    }
  } catch (e) {
    yield put({type: GET_MOVIES_DETAILS_FAILURE, payload: e.message});
    if (action?.payload?.onFailure) {
      action?.payload?.onFailure(e);
    }
  }
}
function* movieDetailsSaga() {
  yield takeLatest(GET_MOVIES_DETAILS, getMovieDetailsSaga);
}
export default movieDetailsSaga;
