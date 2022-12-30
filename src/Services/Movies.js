import { TstAPI, OmdbURL } from './BaseApi'
import axios from 'axios';

const tstApiUrl = process.env.REACT_APP_API_URL;
const omdbApiUrl = process.env.REACT_APP_Omdb_API_URL;
const omdbApiKey = process.env.REACT_APP_Omdb_API_Key;

export const addMoviesToFavorites = async (selectedMovies) => {
    let apiCallList = [];

    for (let imdbID of selectedMovies) {
        apiCallList.push(TstAPI.post(`${tstApiUrl}/favorites`, { imdbID }))
    }

    return axios.all(apiCallList).then(axios.spread((responses) => {
        return responses.status;
    }),
        (e) => {
            return e
        })
}

export const getMoviesList = async (searchInput) => {
    return OmdbURL.get(`${omdbApiUrl}/?s=${searchInput}&type=movie&apikey=${omdbApiKey}`).then(response => {
        const Search = response.data.Search;
        let result = [];
        for (let movie of Search) {
            result.push((({ Title, Year, imdbID }) => ({ Title, Year, imdbID }))(movie))
        }
        return result;
    })
}

export const getMovieById = async (movieId) => {
    return OmdbURL.get(`${omdbApiUrl}/?i=${movieId}&apikey=${omdbApiKey}`).then(response => {
        const result = (({ Title, Year, imdbID }) => ({ Title, Year, imdbID }))(response);
        return result
    })
}


export const parseMoviesFromOMDB = async () => {
    const favoriteMovies = await getFavoritesMoviesList();
    let apiCallList = [];
    for (let imdbID of favoriteMovies) {
        apiCallList.push(OmdbURL.get(`${omdbApiUrl}/?i=${imdbID}&apikey=${omdbApiKey}`))
    }

    return axios.all(apiCallList).then(axios.spread((...responses) => {
        const response = responses.map(movie => movie.data);
        let result = [];
        for (let movie of response) {
            result.push((({ Title, Year, imdbID }) => ({ Title, Year, imdbID }))(movie))
        }
        return result;
    }),
        (e) => {
            return e
        })
}

export const deleteMovie = async (imdbID) => {
    return TstAPI.delete(`${tstApiUrl}/favorites/${imdbID}`).then(response => {
        return response.status;
    })
}

const getFavoritesMoviesList = async () => {

    return TstAPI.get(`${tstApiUrl}/favorites`).then(response => {
        const favoriteMovies = response.data.favorites.map(movie => movie.imdbID);
        return favoriteMovies
    })
}
