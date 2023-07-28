import {call, put, takeLatest} from 'redux-saga/effects';
import {
  GET_POPULAR_MOVIES,
  GET_POPULAR_MOVIES_FAILURE,
  GET_POPULAR_MOVIES_SUCCESS,
} from './const';
import axios from 'axios';

async function getPopularMoviesApi() {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `https://api.themoviedb.org/3/movie/popular`,
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MzA2NTM4NDkzOWU3NDU1YTI4YTYzYzFmYTlhYzllMyIsInN1YiI6IjY0YzBjNjNjMmYxYmUwMDEwYzgxYTgxZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.aL3dnfwwkvOcRgEZ-AgsmK-S54x507pCjqryq87Gkwk',
      accept: 'application/json',
    },
  };
  const response = await axios.request(config);
  return response;
}
function* getPopularMoviesSaga(action) {
  try {
    const response = yield call(getPopularMoviesApi);
    yield put({type: GET_POPULAR_MOVIES_SUCCESS, payload: response.data});
    if (action?.payload?.onSuccess) {
      action?.payload?.onSuccess(response);
    }
  } catch (e) {
    yield put({type: GET_POPULAR_MOVIES_FAILURE, payload: e.message});
    if (action?.payload?.onFailure) {
      action?.payload?.onFailure(e);
    }
  }
}
function* popularMoviesSaga() {
  yield takeLatest(GET_POPULAR_MOVIES, getPopularMoviesSaga);
}
export default popularMoviesSaga;
