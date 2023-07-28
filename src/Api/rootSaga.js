import {all} from 'redux-saga/effects';
import popularMoviesSaga from './PopularMovies/saga';
import searchSaga from './Search/saga';
import movieDetailsSaga from './MovieDetails/saga'

export default function* rootSaga() {
  yield all([searchSaga(), popularMoviesSaga(), movieDetailsSaga()]);
}
