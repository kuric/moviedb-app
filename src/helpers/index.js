import axios from "axios";
import {MOVIE_DB_API_KEY} from "../constants";

const MOVIE_DB_BASE_URL = 'https://api.themoviedb.org/3';

const createMovieDbUrl = (relativeUrl, queryParams) => {
    let baseUrl = `${MOVIE_DB_BASE_URL}${relativeUrl}?api_key=${MOVIE_DB_API_KEY}&language=en-US`;
    if (queryParams) {
        Object.keys(queryParams)
            .forEach(paramName => baseUrl += `&${paramName}=${queryParams[paramName]}`);
    }
    return baseUrl;
};

export const getTopMovies = async (page) => {
    const fullUrl = createMovieDbUrl('/movie/top_rated', {
        page
    });
    const response = await axios.get(fullUrl);
    return response.data;
};

const TMDB_IMAGE_BASE_URL = (width = 300) => `https://image.tmdb.org/t/p/w${width}`;

export const updateMoviePictureUrls = (movieResult, width = 300) => ({
    ...movieResult,
    backdrop_path: `${TMDB_IMAGE_BASE_URL(width)}${movieResult.backdrop_path}`,
    poster_path: `${TMDB_IMAGE_BASE_URL(width)}${movieResult.poster_path}`,
});

export const updateMoviesList = (moviesResponse) => {
    return !!moviesResponse ? ([
        ...moviesResponse.map(movieResult => updateMoviePictureUrls(movieResult))
    ]) : null;
};
