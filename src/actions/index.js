import {createAsyncActionCreator} from '../helpers/reducers.helpers';
import * as movieService from '../helpers';

export const keys = {
    'GET_TOP_MOVIES': 'GET_TOP_MOVIES',
    'SEARCH_MOVIES': 'SEARCH_MOVIES',
    'GET_MOVIE_DETAILS': 'GET_MOVIE_DETAILS',
    'GET_GENRES': 'GET_GENRES'
};

export const getTopMovies = (page) => createAsyncActionCreator(
    // actionType
    keys.GET_TOP_MOVIES,
    // requestFn
    movieService.getTopMovies,
    // requestParams
    {page}
);

export const searchMovies = (page, query) => createAsyncActionCreator(
    keys.SEARCH_MOVIES,
    movieService.searchMovies,
    {page, query}
);

export const getMovieDetails = (movieId) => createAsyncActionCreator(
    keys.GET_MOVIE_DETAILS,
    movieService.getMovieDetails,
    {movieId}
);

export const getGenres = () => createAsyncActionCreator(
    keys.GET_GENRES,
    movieService.getGenres,
    {}
);
