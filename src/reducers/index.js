import {combineReducers} from 'redux';
import { createAsyncReducer } from '../helpers/reducers.helpers';
import { keys as movieActionKeys } from '../actions';

const moviesSuccessReducer = (state, action) => {
    // const existingMovies = state.response ? state.response.results : [];
    // console.log('moviesucces', existingMovies)
    return {
        ...state,
        isLoading: false,
        response: {
            ...action.response,
            results: [
                ...action.response.results
            ]
        }
    };
};

const genreSuccessReducer = (state, action) => {
    const existingGenres = state.response ? state.response.results : [];
    return {
        ...state,
        isLoading: false,
        response: {
            ...action.response,
            genres: [
                ...existingGenres,
                ...action.response.genres
            ]
        }
    };
};


export default combineReducers({
    genres: createAsyncReducer(movieActionKeys.GET_GENRES, {
        [`${movieActionKeys.GET_GENRES}_SUCCESS`]: genreSuccessReducer
    }),
    topMovies: createAsyncReducer(movieActionKeys.GET_TOP_MOVIES, {
        [`${movieActionKeys.GET_TOP_MOVIES}_SUCCESS`]: moviesSuccessReducer
    }),
    searchedMovies: createAsyncReducer(movieActionKeys.SEARCH_MOVIES, {
        [`${movieActionKeys.SEARCH_MOVIES}_SUCCESS`]: moviesSuccessReducer
    }),
    movieDetails: createAsyncReducer(movieActionKeys.GET_MOVIE_DETAILS),
});
