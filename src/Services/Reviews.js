import { TstAPI } from './BaseApi'

const tstApiUrl = process.env.REACT_APP_API_URL;


export const addMovieReview = async (imdbID, reviewInput) => {
    return TstAPI.post(`${tstApiUrl}/reviews/${imdbID}`, reviewInput).then(response => {
        return response.status;
    }, (e) => {
        return e.response.status
    })

}

export const getReviewsFromMovie = async (imdbID) => {
    return TstAPI.get(`${tstApiUrl}/reviews/${imdbID}`).then(response => {
        return response.data.reviews;
    })
}

export const getMyReviews = async () => {
    return TstAPI.get(`${tstApiUrl}/reviews/my`).then(response => {
        console.log(response)
        return response.data.reviews;
    })
}

export const deleteReview = async (imdbID) => {
    return TstAPI.delete(`${tstApiUrl}/reviews/${imdbID}`).then(response => {
        return response.status;
    })
}

