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

export const getFavoritesMoviesList = async () => {
    return OmdbURL.get(TstAPI.get(`${tstApiUrl}/favorites`)).then(response => {
        const result = response.favorites.map(movie => movie.imdbID);
        return result;
    })
}
