import {call, put, takeLatest} from 'redux-saga/effects';
import {
  GET_MOVIE_BY_QUERY,
  GET_MOVIE_BY_QUERY_FAILURE,
  GET_MOVIE_BY_QUERY_SUCCESS,
} from './const';
import axios from 'axios';

async function getMovieByQueryApi(query) {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `https://api.themoviedb.org/3/search/movie?query=${query}`,
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MzA2NTM4NDkzOWU3NDU1YTI4YTYzYzFmYTlhYzllMyIsInN1YiI6IjY0YzBjNjNjMmYxYmUwMDEwYzgxYTgxZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.aL3dnfwwkvOcRgEZ-AgsmK-S54x507pCjqryq87Gkwk',
      accept: 'application/json',
    },
  };
  const response = await axios.request(config);
  return response;
}
function* getMovieByQuerySaga(action) {
  try {
    const response = yield call(getMovieByQueryApi, action.payload.query);
    yield put({type: GET_MOVIE_BY_QUERY_SUCCESS, payload: response.data});
    if (action?.payload?.onSuccess) {
      action?.payload?.onSuccess(response);
    }
  } catch (e) {
    yield put({type: GET_MOVIE_BY_QUERY_FAILURE, payload: e.message});
    if (action?.payload?.onFailure) {
      action?.payload?.onFailure(e);
    }
  }
}
function* searchSaga() {
  yield takeLatest(GET_MOVIE_BY_QUERY, getMovieByQuerySaga);
}
export default searchSaga;
