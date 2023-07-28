import {combineReducers} from 'redux';
import searchReducer from '../Api/Search/reducers';
import popularMoviesReducer from '../Api/PopularMovies/reducers';
import movieDetailsReducer from '../Api/MovieDetails/reducer';
// import movieDetails from '../Api/';

const rootReducer = combineReducers({
  searchReducer: searchReducer,
  popularMoviesReducer: popularMoviesReducer,
  movieDetailsReducer: movieDetailsReducer,
});

export default rootReducer;
