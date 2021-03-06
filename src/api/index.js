import axios from "axios";
import {MOVIE_DB_API_KEY} from "../constants";
const TMDB_IMAGE_BASE_URL = (width = 300) => `https://image.tmdb.org/t/p/w${width}`;
const MOVIE_DB_BASE_URL = 'https://api.themoviedb.org/3';
/**
 * Returns URL to connect with TMDB.com
 * @example
 * // returns 2
 * globalNS.method1(5, 10);
 * @example
 * // returns 3
 * globalNS.method(5, 15);
 * @returns {String} Returns the value of x for the equation.
 */
const createMovieDbUrl = (relativeUrl, queryParams) => {
    let baseUrl = `${MOVIE_DB_BASE_URL}${relativeUrl}?api_key=${MOVIE_DB_API_KEY}&language=en-US`;
    if (queryParams) {
        Object.keys(queryParams)
            .forEach(paramName => baseUrl += `&${paramName}=${queryParams[paramName]}`);
    }
    return baseUrl;
};

export const getTopMovies = async ({page}) => {
    const fullUrl = createMovieDbUrl('/movie/top_rated', {
        page
    });
    const response = await axios.get(fullUrl);
    return response.data;
};
export const searchMovies = async ({page, query}) => {
    const fullUrl = createMovieDbUrl('/search/movie', {
        page,
        query
    });
    const response = await axios.get(fullUrl);
    return response.data;
};

export const getMovieDetails = async (movieId) => {
    const fullUrl = createMovieDbUrl(`/movie/${movieId}`);
    const response = await axios.get(fullUrl);
    return response.data;
};
export const getMovieRecomendations = async (movieId) => {
    const fullUrl = createMovieDbUrl(`/movie/${movieId}/recommendations`);
    const response = await axios.get(fullUrl);
    return response.data;
};

export const getGenres = async () => {
    const fullUrl = createMovieDbUrl('/genre/movie/list');
    const response = await axios.get(fullUrl);
    return response.data;
};

export const updateMoviesList = (moviesResponse) => {
    return !!moviesResponse ? ([
        ...moviesResponse.map(movieResult => updateMoviePictureUrls(movieResult))
    ]) : null;
};

const updateMoviePictureUrls = (movieResult, width = 300) => ({
    ...movieResult,
    backdrop_path: `${TMDB_IMAGE_BASE_URL(width)}${movieResult.backdrop_path}`,
    poster_path: `${TMDB_IMAGE_BASE_URL(width)}${movieResult.poster_path}`,
});

export const mapMoviesList = (moviesResponse, genresResponse) => {
    // console.log('map', genresResponse)
    return !!moviesResponse ? ([
        ...moviesResponse.map(movieResult => updateMovieGenres(movieResult, genresResponse))
    ]) : null;
};
const updateMovieGenres = (movieResult, genres) => {
    // console.log('updateMovieGenres',movieResult, genres)
    let tmpArr = movieResult;
    let newArr =[];
    tmpArr.genre_ids.forEach( id => {
        genres.genres.forEach(genre => {
            if(genre.id === id) newArr.push(genre.name)
        });
        return newArr;
    });
    return {
        ...movieResult,
        genreNames: newArr
    }
};
